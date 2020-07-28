const { Router } = require('express')

const Middlewares = require('./utils/middlewares')
const ListController = require('./controllers/listController')
const ItemController = require('./controllers/itemController')

const middlewares = new Middlewares()
const listController = new ListController()
const itemController = new ItemController()

const router = Router()

router.post('/list',
    middlewares.listPost(),
    listController.create)

router.get('/list/:hash',
    middlewares.listGet(),
    listController.show)

router.post('/list/:hash',
    middlewares.itemsPost(),
    itemController.create)

module.exports = router