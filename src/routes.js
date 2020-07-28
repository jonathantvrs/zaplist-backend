const { Router } = require('express')

const Middlewares = require('./utils/middlewares')
const ListController = require('./controllers/listController')

const middlewares = new Middlewares()
const listController = new ListController()

const router = Router()

router.post('/list',
    middlewares.listPost(),
    listController.create)

router.get('/list/:hash',
    middlewares.listGet(),
    listController.show)

module.exports = router