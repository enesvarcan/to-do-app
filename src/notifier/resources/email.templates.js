exports.getWelcomeMessage = (name) => {
    return `
    Todoapp'e Hoşgeldiniz!

    Merhaba ${name},

    Todoapp'e kaydolduğunuz için teşekkür ederiz. 

    Verimli günler dileriz! 

    `
}

exports.getNoTodoDoneMessage = () => {
    return `
    Merhaba,

    Bugün tamamlanan herhangi bir göreviniz bulunmuyor.


    `
}

exports.getTodosDoneMessage = (todoTitles, numberOfTodos) => {
    return `
    Merhaba,
    
    Bugün ${numberOfTodos} adet görev tamamladınız:

    ${todoTitles}

    `
}

exports.dailyTodoNotification = () => {return "Günlük Todo Bilgilendirmesi"}