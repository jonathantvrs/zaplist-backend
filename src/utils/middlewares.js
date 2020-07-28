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
}

module.exports = Middlewares