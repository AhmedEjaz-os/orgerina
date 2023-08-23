const model = require("../schema/createUserSchema");

const provideUserInfo = async(req, res) => {
    const headers = (req?.headers?.cookie).split('=')[1];
    if(!headers){
        res.status(403).json({
            Error: "YOU ARE NOT AUTHORIZED!!!"
        })
    }
    const { email } = req.body;
    const documentFromDb = await model.findOne({
        email,
        __access_token: headers
    });
    if(!documentFromDb){
        res.status(403).json({
            Error: "YOU ARE NOT AUTHORIZED!!!"
        })
    }
    else{
        const {name, email, neech} = documentFromDb;
        res.json({
            name,
            email,
            neech
        });
    }
}

module.exports = { 
    provideUserInfo
}