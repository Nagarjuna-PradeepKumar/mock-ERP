const Joi = require('@hapi/joi')

const design_order_validation = (data)=>{
    const schema= Joi.object({
        project : Joi.string().required(), 
        details : Joi.array().items(Joi.object())      
    });
    return schema.validate(data)
}

module.exports.design_order_validation = design_order_validation;