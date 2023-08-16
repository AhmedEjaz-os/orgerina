const Joi = require('joi');


const CreateUserValidationSchema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email()
        .lowercase(),
    password: Joi.string()
        .min(8)
        .required()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
    neech: Joi.string()
        .required()
});


module.exports = {
    CreateUserValidationSchema
}