const Joi = require('@hapi/joi')


const store_query_history_validation = (data)=>{
    const schema = Joi.object({
        project : Joi.string().required(),
        partno : Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports.store_query_history_validation=store_query_history_validation;