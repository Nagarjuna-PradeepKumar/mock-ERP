const Joi = require('@hapi/joi')

const design_editfetch_validation = (data)=>{
    const schema = Joi.object({
        project                 : Joi.string().required(),
        partno                  : Joi.string().required(),
     })

    return schema.validate(data)
}

module.exports.design_editfetch_validation=design_editfetch_validation;