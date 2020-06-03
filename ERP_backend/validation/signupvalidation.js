const Joi = require('@hapi/joi')


const signupvalidation = (data)=>{
    const schema = Joi.object({
        username : Joi.string().lowercase().required().email(),
        designation :Joi.string().required(),
        password : Joi.string().required(),
        repeat_password : Joi.required().valid(Joi.ref('password'))
    });
   
    return schema.validate(data)
}

module.exports.signupvalidation = signupvalidation;


