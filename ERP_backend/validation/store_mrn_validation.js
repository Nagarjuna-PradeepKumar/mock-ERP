const Joi = require('@hapi/joi')

const store_mrn_validation = (data)=>{
    const schema = Joi.object({
        project          : Joi.string().required(),
        partno           : Joi.string().required(),
        taken_date       : Joi.string(),
        takenby          : Joi.string().required(),
        taken_quantity   : Joi.number().required(),
        store_lock       : Joi.boolean(),
    })

    return schema.validate(data)
}

module.exports.store_mrn_validation=store_mrn_validation;