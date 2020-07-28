


class ItemController{
    async create(request, response){
        return response.json({message: 'criou'})
    }
}

module.exports = ItemController