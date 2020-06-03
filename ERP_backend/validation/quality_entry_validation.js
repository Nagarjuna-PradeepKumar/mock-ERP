const Joi = require('@hapi/joi')

const quality_entry_validation = (data)=>{
    const schema = Joi.object({
        project                 : Joi.string().required(),
        partno                  : Joi.string().required(),
        inspected_quantity      : Joi.number().required(),
        date                    :Joi.string(),
        inspec_details          : Joi.string().required(),
        quality_lock            : Joi.boolean().required(),
    })

    return schema.validate(data)
}

module.exports.quality_entry_validation=quality_entry_validation;