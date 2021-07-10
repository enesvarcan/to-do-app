const sendEmail = require('./mailer')
const axios = require('axios')
const User = require('../models/user.model')
const emailTemplates = require('../resources/email.templates')

exports.healthCheck = (req, res) => {
    res.status(200).send('Todoapp Notifier Service is up and running!')
}

exports.newUserRegistered = (req, res) => {

    var userInfo = {
        username: req.body.username,
        email: req.body.email,
        notif_allow: req.body.notif_allow,
        name: typeof req.body.name != 'undefined' ? req.body.name.name : "",
        surname: typeof req.body.surname != 'undefined' ? req.body.name.surname : "",
    }

    var user = new User(userInfo)
    
    user.save((err, usr) => {
        if (err) return res.status(500).send(err)

        var mailSentStatus = sendWelcomeMail(usr)

        if(typeof res != 'undefined') return res.status(mailSentStatus).send()
    })
}

exports.triggerDailyNotifications = (req, res) => {
    try{
        this.notifyUsers()
        res.status(200).send("notifications_are_sent")
    } catch(err) {
        res.status(500).send("server_error")
    }
}

exports.notifyUsers = async () => {

    let users = await User.find({notif_allow: true})
    for(user of users){
        let items = await getDoneTodoItems(user.username)
        if(items.data.length === 0){
            var message = emailTemplates.getNoTodoDoneMessage()
        } else {
            
            let titles = items.data.map((item) => {return item.title});
            var message = emailTemplates.getTodosDoneMessage(titles.join('\n'), titles.length)
        }
        sendEmail(user.email, emailTemplates.dailyTodoNotification(), message, true)
    }
    
}

function sendWelcomeMail(user) {
    var name = "Todoapp Kullanıcısı"

    if(user.name != '' && user.surname != '') name = user.name + " " + user.surname
    else if (typeof user.username != 'undefined') name = user.username

    var message = emailTemplates.getWelcomeMessage(name)

    return sendEmail(user.email, 'Todoapp\'e Hoşgeldiniz!', message, debug=true)
}

function getDoneTodoItems(username) {
    var config = {
        headers: {
            Authorization: "Bearer " + process.env.TOKEN
        }
    }

     return axios.get('http://192.168.1.55:9002/todo/user/'+username+'/dailyTodos', config)
}