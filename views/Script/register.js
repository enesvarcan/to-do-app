let backBtn = document.getElementById("back-btn");
let registerBtn = document.getElementById("register-btn");


backBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    backToLogin();
});

function backToLogin(){
    let url = document.location.origin;
    url += '/Page/login.html';
    location.replace(url);
}

registerBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(checkInputs()){
        let temp = createUser()//create temp obj
        postRequest(temp)
    }
    
});

function checkInputs(){

    let returnVal=true;
    let phoneInput = document.getElementById("phoneNumberInput");
    let mailInput = document.getElementById("emailInput");
    
    var numbers = /^[0-9]+$/;
    console.log(phoneInput.value.match(numbers));

    if(!validateEmail(mailInput.value)){
        alert("Email hatalı girilmiştir.");
        returnVal=false;
    }
    if((phoneInput.value.length!=10) && (!phoneInput.value.match(numbers))){
        alert('Numara hatalı girilmiştir.');
        returnVal=false;
    }

    return returnVal;
}

function createUser(){
    let usernameInput = document.getElementById("usernameInput");
    let passwordInput = document.getElementById("passwordInput");
    let nameInput = document.getElementById("nameInput");
    let surnameInput = document.getElementById("surnameInput");
    let mailInput = document.getElementById("emailInput");
    let phoneInput = document.getElementById("phoneNumberInput");
    let notifAllowChecker = document.getElementById("notifAllowInput");

    let user = new Object();
    user.username = usernameInput.value;
    user.password = passwordInput.value;
    user.name = nameInput.value;
    user.surname = surnameInput.value;
    user.email = mailInput.value;
    user.phone_number = phoneInput.value;
    if(notifAllowChecker.checked){
        user.notif_allow = true;
    }else{
        user.notif_allow = false
    }
    
    return user
}

function postRequest(user){
    fetch(`${url}/user/create`, {
        method : 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then(resp => {backToLogin()})
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }