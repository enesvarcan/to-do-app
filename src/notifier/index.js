require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const CronJob = require('cron').CronJob
const morgan = require('morgan')
const controller = require('./controllers/controller')

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(require('./router'))
app.use(morgan('combined'))

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env.DB_CONN_STR)
    .then(() => {
        console.log('Succesfully connected to DB...')
        
    }).catch((err) => {
        console.log(err)
    })

/* Cron patterns
    '0 18 * * *' : Fire at 18:00 every day
    '* * * * * *' : Fire at every second
    '* * * * *' : Fire at every minute
*/

var job = new CronJob('0 23 * * *', controller.notifyUsers, null, true)
job.start()

app.listen(process.env.PORT, () => {
    console.log("*-*-*-*-*-*- Todoapp Notifier Service started -*-*-*-*-*-*")
})