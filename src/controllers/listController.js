const cryptoRandomString = require('crypto-random-string');

const connection = require('../database/connection')
const verificaExistenciaHash = require('../utils/verificaExistenciaHash')

const HASH_LENGTH = 20


class ListController{
    async create(request, response){
        let hash = cryptoRandomString({length: HASH_LENGTH})
        let hashJaCadastrado = await verificaExistenciaHash(hash)
        
        while (hashJaCadastrado){
            hash = cryptoRandomString({length: HASH_LENGTH})
            hashJaCadastrado = await verificaExistenciaHash(hash)
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
        return response.json(listCreated)
    }
}

module.exports = ListController