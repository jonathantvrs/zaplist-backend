const connection = require('../database/connection')
const verificaExistenciaHash = require('../utils/verificaExistenciaHash')


class ItemController{
    async create(request, response){
        const { hash } = request.params
        const { name } = request.body   

        const hashJaCadastrado = await verificaExistenciaHash(hash)

        if (!hashJaCadastrado){
            return response.json({
                error: "hash não encontrado"
            })
        }

        const list_id = (await connection('zaplists')
                                .select('id')
                                .where({hash})
                        )[0].id

        await connection('zaplistitems').insert({ name, list_id })

        return response.json({message: 'criou'})
    }
}


module.exports = ItemController