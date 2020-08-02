const connection = require('../database/connection')
const verificaExistenciaHash = require('../utils/verificaExistenciaHash')


class ItemController{
    async create(request, response){
        const { hash } = request.params
        const { name } = request.body   

        const hashJaCadastrado = await verificaExistenciaHash(hash)

        if (!hashJaCadastrado){
            return response.status(404).json({
                error: "hash não encontrado"
            })
        }

        const list = (await connection('zaplists')
                                .select('id', 'amount', 'crowded')
                                .where({hash})
                        )[0]

        if (list.crowded){
            return response.status(400).json({
                error: "lista já está lotada"
            })
        }

        await connection('zaplistitems').insert({ name, list_id: list.id })

        const itemsRelacionados = (await connection('zaplistitems')
                                            .where('list_id', list.id)
                                            .count('id')
                                    )[0].count
        
        if(Number(itemsRelacionados) === list.amount){
            await connection('zaplists')
                    .where('id', list.id)
                    .update('crowded', true)
        }

        return response.status(201).json({ message: 'criou' })
    }
}


module.exports = ItemController