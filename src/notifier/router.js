const router = require('express').Router()
const controller = require('./controllers/controller')

router.get('/healthCheck', controller.healthCheck)

router.post('/newUserRegistered', controller.newUserRegistered)

module.exports = router