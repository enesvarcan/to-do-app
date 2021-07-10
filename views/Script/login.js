let girisbtn = document.getElementById('giris-btn');
let sifreInput = document.getElementById('sifreInput');
let registerbtn = document.getElementById('register-btn');



window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

checkLoggedIn();

girisbtn.addEventListener('click', (e)=> {
    e.preventDefault();
    login();
});

sifreInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13){
        e.preventDefault();
        login();
    }
});

registerbtn.addEventListener('click', (e)=> {
    e.preventDefault();
    let url = document.location.origin;
    url += '/Page/register.html';
    location.replace(url);
});

async function login(){
    showLoader();
    let kullaniciAdiInput = document.getElementById('kullaniciAdiInput');
    let sifreInput = document.getElementById('sifreInput');

    let requestBody = new Object();
    requestBody.username=kullaniciAdiInput.value;
    requestBody.password=sifreInput.value;

    //düzgün adres girilecek.
    await fetch(`${url}/login`,{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }) 
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if(data.status == undefined){
            document.cookie = `kullaniciAdi=${kullaniciAdiInput.value};`;
        document.cookie = `token=${data.jwt}`;
             goToToDoPage();
        }else{
            let sifreHelper = document.getElementById('sifreHelp');
            sifreHelper.innerText = "Kullanıcı adı veya şifre yanlış."
        }
        
       
    })
    .catch(function (error) {
        
    });

    hideLoader();

}

function goToToDoPage(){
    let url = document.location.origin;
    url += '/Page/todo.html';
    location.replace(url);
}

function checkLoggedIn(){
    let kullanici = window.getCookie('kullaniciAdi');

    if(kullanici != undefined){
        goToToDoPage();
    }
}

function showLoader(){
    let loadingBox = document.getElementById('loading-box');
    loadingBox.classList.remove('d-none');
}

function hideLoader(){
    let loadingBox = document.getElementById('loading-box');
    loadingBox.classList.add('d-none');
}