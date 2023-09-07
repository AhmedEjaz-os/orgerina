const model = require('../schema/createUserSchema.js')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../mailerService/NodeMailerService.js')

const {
    CreateUserValidationSchema
} = require('../joiValidatoin/joiValidationSchemas.js')

const checkApi = (req, res) => {
    res.json({body: 'API IS WORKING'});
}

const signInOwner = (req, res) => {
    res.json(mongoose.collection.find());
}

const encyptPassword = (password) => {
    const saltRounds = 10;
    const hash = bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            return hash
        })
        .catch(err => console.error(err.message))
    return hash;
}

const createJsonWebToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

const createJsonWebTokenVerifyEmail = (user) => {
    return jwt.sign(user, process.env.EMAIL_VERIFY_TOKEN);
}

const createUser = async(req, res) => {
    const {name, email, password, neech} = req.body;
    let result;
    try{
        result = await CreateUserValidationSchema.validateAsync(req.body);
    }
    catch(e) {
        res.status(401).json(e.details[0].message);
    }
    if(result){
        const __encyptedPassword = await encyptPassword(password);
        const token = createJsonWebToken(req.body);
        const verifyEmailToken = createJsonWebTokenVerifyEmail(req.body);
        var createUser = new model(
            {
                name,
                email,
                __password: __encyptedPassword,
                neech,
                __access_token: token,
                __email_access_token: verifyEmailToken
            }
        );
        await createUser.save()
        .then((data) => {
                res.cookie("ACCESS_TOKEN", token, {
                    maxAge: 86400000,
                    secure: false,
                });

                if(!data.__isVerifiedEmail){
                    const message = VerifyEmailSenderModule(data.email, data.__email_access_token);
                    if(message){
                        res.json({
                            data,
                            message: "email sent!!!"
                        });
                    }
                    else{
                        res.json({
                            data,
                            message: "There was a problem send email!!!"
                        });
                    }
                }
                else{
                    res.json(data);
                }
            })
        .catch(e => {
            if(String(e).includes("password` is required")){
                res.status(401).json({
                    error: "Password is required"
                })
            }
            else {
                res.status(401).json({
                    error: "Email already exist",
                })
            }
        });
    }
}

const signInUser = async(req, res) => {
    const {email, password} = req.body;
    const documentFromDb = await model.findOne({
        email
    })
    .then((data) => { return data; });
    if(documentFromDb){
        await bcrypt.compare(password, documentFromDb.__password, async (err, resp) => {
            if(!resp){
                res.status(401).json({
                    error: "Email or Password does not match"
                })
            }
            if(resp){
                const token = createJsonWebToken({name: documentFromDb.name, email: documentFromDb.email, password: documentFromDb.password, neech: documentFromDb.neech});
                let __didItUpdate;
                try{
                    __didItUpdate = await model.findOneAndUpdate({email}, {__access_token: token});
                }
                catch(e){
                    res.status(400).json({
                        err
                    });
                }
                if(__didItUpdate){
                    res.cookie("ACCESS_TOKEN", token, {
                        maxAge: 86400000,
                        secure: false,
                    })
                    res.status(200).json({
                        documentFromDb,
                        message: "User is signed in..."
                    })    
                }
            }
        })
    }
    else{
        res.status(401).json({
            error: "Email or Password does not match !!! Password Not Matched !!!"
        })
    }
}

const VerifyEmailSenderModule = async(email, verifyEmailToken) => {
    const response = sendEmail(email, verifyEmailToken);
    return response;
}

const VerifyStatusUpdateModule = async(req, res) => {
    const {token, email} = req.params;
    await model.findOne(
        {email}
    ).then(async data => {
        if(data.__isVerifiedEmail === true){
            res.send("Email Already Verified no need to verify it again");
        }
        else{
            let __EmailVerified;
            try{
                __EmailVerified = await model.findOneAndUpdate(
                    {email, __email_access_token: token},
                    {__isVerifiedEmail: true}
                )
            }
            catch(e){
                res.send("Your Verify Link Has Expired Please Click The Latest Link. THANK YOU!");
            }
            if(__EmailVerified){
                const {email, neech} = __EmailVerified;
                res.json({
                    email,
                    neech,
                    __isVerifiedEmail: true
                });
            }
        }
    });
}

module.exports = { 
    signInOwner,
    checkApi,
    createUser,
    signInUser,
    VerifyStatusUpdateModule
}