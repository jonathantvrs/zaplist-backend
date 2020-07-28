const express = require('express')
const { errors } = require('celebrate')

const router = require('./routes')

const app = express()

app.use(express.json())
app.use(router)
app.use(errors())

app.listen(3333)