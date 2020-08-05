const cryptoRandomString = require('crypto-random-string');

const connection = require('../database/connection')
const verificaExistenciaHash = require('../utils/verificaExistenciaHash')

const HASH_LENGTH = 20


class ListController {
    async create(request, response) {
        let hash = cryptoRandomString({length: HASH_LENGTH})
        let hashExists = await verificaExistenciaHash(hash)
        
        while (hashExists) {
            hash = cryptoRandomString({length: HASH_LENGTH})
            hashExists = await verificaExistenciaHash(hash)
        }

        const { name, description, amount, date } = request.body

        const list = {
            name,
            description,
            hash,
            amount,
            date
        }

        const listCreated = await connection('zaplists').insert(list, ['hash'])
        return response.status(201).json(listCreated)
    }

    async show(request, response) {
        const { hash } = request.params
        const hashExists = await verificaExistenciaHash(hash)

        if (!hashExists) {
            return response.status(400).json({
                error: "hash não encontrado"
            })
        }

        const list = (await connection('zaplists').where({hash}))[0]
        const items = (await connection('zaplistitems')
                                .select('name')
                                .where('list_id', list.id))

        return response.status(201).json({...list, items})
    }
}


module.exports = ListController
