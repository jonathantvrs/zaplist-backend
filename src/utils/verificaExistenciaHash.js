const connection = require('../database/connection')

async function verificaExistenciaHash(hash){
    const list = await connection('zaplists').where({hash})
    return list[0] !== undefined
}

module.exports = verificaExistenciaHash