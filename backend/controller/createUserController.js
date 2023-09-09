const model = require("../schema/createUserSchema.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../mailerService/NodeMailerService.js");

const {
  CreateUserValidationSchema,
} = require("../joiValidatoin/joiValidationSchemas.js");

const checkApi = (req, res) => {
  res.json({ body: "API IS WORKING" });
};

const signInOwner = (req, res) => {
  res.json(mongoose.collection.find());
};

const encyptPassword = (password) => {
  const saltRounds = 10;
  const hash = bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));
  return hash;
};

const createJsonWebToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

const createJsonWebTokenVerifyEmail = (user) => {
  return jwt.sign(user, process.env.EMAIL_VERIFY_TOKEN);
};

const createUser = async (req, res) => {
  const { name, email, password, neech } = req.body;
  let result;
  try {
    result = await CreateUserValidationSchema.validateAsync(req.body);
  } catch (e) {
    res.status(401).json(e.details[0].message);
  }
  if (result) {
    const __encyptedPassword = await encyptPassword(password);
    const token = createJsonWebToken(req.body);
    const verifyEmailToken = createJsonWebTokenVerifyEmail(req.body);
    var createUser = new model({
      name,
      email,
      __password: __encyptedPassword,
      neech,
      __access_token: token,
      __email_access_token: verifyEmailToken,
    });
    await createUser
      .save()
      .then((data) => {
        if (!data.__isVerifiedEmail) {
          const message = VerifyEmailSenderModule(
            data.email,
            data.__email_access_token,
            token
          );
          res.cookie("TEMP_TOKEN", token, {
            maxAge: 86400000,
            secure: false,
          });
          if (message) {
            res.json({
              data,
              message: "email sent!!!",
            });
          } else {
            res.json({
              data,
              message: "There was a problem send email!!!",
            });
          }
        } else {
          res.json(data);
        }
      })
      .catch((e) => {
        if (String(e).includes("password` is required")) {
          res.status(401).json({
            error: "Password is required",
          });
        } else {
          res.status(401).json({
            error: "Email already exist",
          });
        }
      });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const documentFromDb = await model
    .findOne({
      email,
    })
    .then((data) => {
      return data;
    });
  if (documentFromDb) {
    await bcrypt.compare(
      password,
      documentFromDb.__password,
      async (err, resp) => {
        if (!resp) {
          res.status(401).json({
            error: "Email or Password does not match",
          });
        }
        if (resp) {
          const token = createJsonWebToken({
            name: documentFromDb.name,
            email: documentFromDb.email,
            password: documentFromDb.password,
            neech: documentFromDb.neech,
          });
          let __didItUpdate;
          try {
            __didItUpdate = await model.findOneAndUpdate(
              { email },
              { __access_token: token }
            );
          } catch (e) {
            res.status(400).json({
              err,
            });
          }
          if (__didItUpdate) {
            if (!__didItUpdate.__isVerifiedEmail) {
              res.cookie("TEMP_TOKEN", token, {
                maxAge: 86400000,
                secure: false,
              });
            } else {
              res.cookie("ACCESS_TOKEN", token, {
                maxAge: 86400000,
                secure: false,
              });
            }
            res.status(200).json({
              documentFromDb,
              message: "User is signed in...",
            });
          }
        }
      }
    );
  } else {
    res.status(401).json({
      error: "Email or Password does not match !!! Password Not Matched !!!",
    });
  }
};

const VerifyEmailSenderModule = async (email, verifyEmailToken, token) => {
  const response = sendEmail(email, verifyEmailToken, token);
  return response;
};

const ResendVerificationEmail = async (req, res) => {
  let headers = req?.headers?.cookie;
  if (headers) {
    headers = headers.split("=")[1];
  }
  if (!headers) {
    res.status(403).json({
      Error: "YOU ARE NOT AUTHORIZED!!!",
    });
  }
  const { email, name, neech, __isVerifiedEmail } = req.body;
  await model
    .findOne({
      email,
      __access_token: headers,
    })
    .then(async (data) => {
      if (data.__isVerifiedEmail) {
        res.status(200).json({
          message: "Email Already Verified!!!",
        });
      } else {
        const verifyEmailToken = createJsonWebTokenVerifyEmail({
          email,
          name,
          neech,
        });
        try {
          await model.findOneAndUpdate(
            { email, __access_token: headers },
            { __email_access_token: verifyEmailToken }
          );
        } catch (e) {
          res.send(
            "Your Verify Link Has Expired Please Click The Latest Link. THANK YOU!"
          );
        }
        const response = sendEmail(email, verifyEmailToken, headers);
        if (response) {
          res.json({
            message: "email sent!!!",
          });
        } else {
          res.json({
            message: "There was a problem send email!!!",
          });
        }
      }
    });
};

const VerifyStatusUpdateModule = async (req, res) => {
  const { token, email, accessToken } = req.params;
  try {
    res.json(await CheckYouNeedVerify(token, email, accessToken));
  } catch (e) {
    console.log(`Found an error ${e} please look through it`);
  }
};

const CheckYouNeedVerify = async (token, email, accessToken) => {
  const objFromReturn = await model
    .findOne({
      email,
      __access_token: accessToken,
    })
    .then(async (data) => {
      if (data.__isVerifiedEmail === true) {
        obj = {
          message:
            "Your Account is Already Verified. NO NEED TO VERIFY AGAIN!!!",
        };
        return obj;
      } else {
        let __EmailVerified;
        try {
          __EmailVerified = await model.findOneAndUpdate(
            { email, __email_access_token: token },
            { __isVerifiedEmail: true }
          );
        } catch (e) {
          return {
            message:
              "Your Verify Link Has Expired Please Click The Latest Link. THANK YOU!",
          };
        }
        if (__EmailVerified) {
          const { email, neech } = __EmailVerified;
          return {
            email,
            neech,
            __isVerifiedEmail: true,
          };
        } else {
          return {
            message: "There is been an error please check your api",
          };
        }
      }
    })
    .catch((e) => {
      return {
        message:
          "This Link has Expired Please press the latest link. Thank you!",
      };
    });

  return objFromReturn;
};

const ForgetPasswordModule = async (req, res) => {
  const { email } = req.body;
  let dbObject;
  try {
    dbObject = await model.findOne({
      email,
    });
  } catch (e) {
    res.status(404).json({
      message: "Email Does not exist",
    });
  }
  if (dbObject) {
    res.status(200).json(dbObject);
  } else {
    res.status(404).json({
      message: "Email Does not Exist",
    });
  }
};

module.exports = {
  signInOwner,
  checkApi,
  createUser,
  signInUser,
  ResendVerificationEmail,
  VerifyStatusUpdateModule,
  ForgetPasswordModule,
};
