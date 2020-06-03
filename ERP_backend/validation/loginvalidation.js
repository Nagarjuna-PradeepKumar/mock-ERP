const Joi = require('@hapi/joi')


const loginvalidation = (data)=>{
    const schema = Joi.object({
        username : Joi.string().lowercase().required().email(),
        password : Joi.string().required(),       
    });
   
    return schema.validate(data)
}

module.exports.loginvalidation = loginvalidation;


