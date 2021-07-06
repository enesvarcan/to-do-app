const sendEmail = require('./mailer')
const axios = require('axios')
const User = require('../models/user.model')

exports.healthCheck = (req, res) => {
    res.status(200).send('Todoapp Notifier Service is up and running!')
}

exports.newUserRegistered = (req, res) => {

    var userInfo = {
        username: req.body.username,
        email: req.body.email,
        notifAllow: req.body.notifAllow,
        name: typeof req.body.name != 'undefined' ? userInfo.name : "",
        surname: typeof req.body.surname != 'undefined' ? userInfo.surname : "",
    }

    var user = new User(userInfo)
    
    user.save((err, usr) => {
        if (err) return res.status(500).send(err)

        var mailSentStatus = sendWelcomeMail(usr)

        if(typeof res != 'undefined') return res.status(mailSentStatus).send()
    })
}

exports.notifyUsers = () => {
    const users = await User.find({notifAllow: true})
    let usernames = users.map(user => user.username)
    const todoItems = getDoneTodoItems(usernames)

    // TODO: TODO
}

function sendWelcomeMail(user) {
    var name = "Todoapp Kullanıcısı"

    if(user.name != '' && user.surname != '') name = user.name + " " + user.surname
    else if (typeof user.username != 'undefined') name = user.username

    var message = `
    Todoapp'e Hoşgeldiniz!

    Merhaba ${name},

    Todoapp'e kaydolduğunuz için teşekkür ederiz. 

    Verimli günler dileriz! 

    `
    return sendEmail(user.email, 'Todoapp\'e Hoşgeldiniz!', message, debug=true)
}

function getDoneTodoItems(usernames) {

    axios.post(process.env.USER_HOST + '/getDoneTodos', usernames)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
        return res
      })
      .catch(error => {
        console.error(error)
      })
}