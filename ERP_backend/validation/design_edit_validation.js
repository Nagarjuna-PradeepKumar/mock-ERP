const Joi = require('@hapi/joi')

const design_edit_validation = (data)=>{
    const schema = Joi.object({
        project                 : Joi.string().required(),
        partno                  : Joi.string().required(),
        description             : Joi.string().required(),
        quantity_ordered        : Joi.number().required(),
        order_date              :Joi.string(),
        designer_lock           : Joi.boolean().required(),
    })

    return schema.validate(data)
}

module.exports.design_edit_validation=design_edit_validation;