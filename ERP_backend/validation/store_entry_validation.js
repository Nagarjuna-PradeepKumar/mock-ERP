const Joi = require('@hapi/joi')

const store_entry_validation = (data)=>{
    const schema = Joi.object({
        project : Joi.string().required(),
        partno : Joi.string().required(),
        received_date: Joi.string(),
        quantity_received: Joi.number().required(),
        store_lock : Joi.boolean(),
    })

    return schema.validate(data)
}

module.exports.store_entry_validation=store_entry_validation;