const model = require('../schema/createUserSchema.js')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


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

const createUser = async(req, res) => {
    const {name, email, password, neech} = req.body;
    let result;
    try{
        result = await CreateUserValidationSchema.validateAsync(req.body);
    }
    catch(e) {
        res.json(e.details[0].message);
    }
    if(result){
        const __encyptedPassword = await encyptPassword(password);
        var createUser = new model(
            {
                name,
                email,
                password: __encyptedPassword,
                neech
            }
        );
        await createUser.save()
        .then((data) => {res.json(data)})
        .catch(e => {
            if(String(e).includes("password` is required")){
                res.json({
                    error: "Password is required"
                })
            }
            else {
                res.json({
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
        await bcrypt.compare(password, documentFromDb.password, (err, resp) => {
            if(!resp){
                res.status(401).json({
                    error: "Email or Password does not match"
                })
            }
            if(resp){
                res.status(200).json({
                    documentFromDb,
                    message: "User is signed in..."
                })
            }
        })
    }
    else{
        res.status(401).json({
            error: "Email or Password does not match"
        })
    }
}

module.exports = { 
    signInOwner,
    checkApi,
    createUser,
    signInUser
}