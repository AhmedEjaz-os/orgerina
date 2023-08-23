const model = require('../schema/createUserSchema.js')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
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
        var createUser = new model(
            {
                name,
                email,
                __password: __encyptedPassword,
                neech,
                __access_token: token
            }
        );
        await createUser.save()
        .then((data) => {
                res.cookie("ACCESS_TOKEN", token, {
                    maxAge: 86400000,
                    secure: false,
                })
                res.json(data);
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

module.exports = { 
    signInOwner,
    checkApi,
    createUser,
    signInUser
}