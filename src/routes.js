const { Router } = require('express')

const ListController = require('./controllers/listController')
const listController = new ListController()

const router = Router()

router.post('/list', listController.create)

module.exports = router