const sendEmail = require('./mailer')

exports.healthCheck = (req, res) => {
    res.status(200).send('Todoapp Notifier Service is up and running!')
}

exports.newUserRegistered = (req, res) => {

    var name = "Todoapp Kullanıcısı"

    if(typeof req.body.name != 'undefined' && typeof req.body.surname != 'undefined') name = req.body.name + " " + req.body.surname
    else if (typeof req.body.username != 'undefined') name = req.body.username

    var message = `
    Todoapp'e Hoşgeldiniz!

    Merhaba ${name},

    Todoapp'e kaydolduğunuz için teşekkür ederiz. 

    Verimli günler dileriz! 

    `
    var status = sendEmail(req.body.email, 'Todoapp\'e Hoşgeldiniz!', message, debug=true)
    
    if(typeof res != 'undefined') return res.status(status).send()
}

exports.notifyUsers = () => {
    // TODO: Implement daily notifications
    
    var status = sendEmail('test@test.com', 'Testing Notifications', 'This is a test message', debug=true)
    
    if(typeof res != 'undefined') return res.status(status).send()
}