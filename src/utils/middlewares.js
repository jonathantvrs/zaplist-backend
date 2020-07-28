const { celebrate, Joi } = require('celebrate')

class Middlewares{
    listPost(){
        return(
            celebrate({
                body: Joi.object().keys({
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    amount: Joi.number().required(),
                    date: Joi.date().required()
                })
            })
        )
    }

    listGet(){
        return(
            celebrate({
                params: Joi.object().keys({
                    hash: Joi.string().required()
                })
            })
        )
    }
}

module.exports = Middlewares