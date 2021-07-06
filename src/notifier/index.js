const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const CronJob = require('cron').CronJob
const morgan = require('morgan')
const controller = require('./controllers/controller')

require('dotenv').config()

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(require('./router'))
app.use(morgan('combined'))

/* Cron patterns
    '0 18 * * *' : Fire at 18:00 every day
    '* * * * * *' : Fire at every second
    '* * * * *' : Fire at every minute
*/

var job = new CronJob('* * * * *', controller.notifyUsers, null, true)
job.start()

app.listen(process.env.PORT, () => {
    console.log("*-*-*-*-*-*- Todoapp Notifier Service started -*-*-*-*-*-*")
})