const { Router } = require('express')

const router = Router()

router.get('/', (request, response) => {
    response.json(
        { 'message': 'olá!' }
    )
})

module.exports = router