window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
}

//checkLoggedIn();
setKullaniciText();


const kullanici = window.getCookie('kullaniciAdi');
const toDoListesiHTML = document.getElementById('proses-listesi');

const menu = document.getElementById('menu');
const body = document.getElementsByTagName('body');
const duzenleBtn = document.getElementById('duzenle-btn');
const logoutbtn = document.getElementById('logout-btn');
const toDoBtn = document.getElementById('toDo-btn');
const token = `Bearer ${window.getCookie('token')}`

let toDoListesi;

refreshTable();
addEventListeners();

console.log(token)

async function refreshTable() {

    toDoListesiHTML.innerHTML = "";
    toDoListesi = [];


    fetch(`${url}/todo/user/${kullanici}`, {
        mode: 'cors',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization,content-type",
            "Content-type": "application/json",
            "Authorization" : token,
            
        })
    }
    ).then((resp) => resp.json()).then(function (data) {
        console.log(data);
        toDoListesi = data;
        toDoListesi.forEach(element => {
            createTableElement(element);
        });
    }).catch(function (error) {
        console.log(error);
    })
}

function createTableElement(data) {
    console.log(data)
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${data.title}
            <div class="menu-btn">
                <span></span>
                <span></span>
                <span></span>

                <div class="menu-container d-none">
                <ul class="menu list-group">

                    <button type="button" class="list-group-item list-group-item-action editToDo-btn">Yeniden Adlandır</button>

                    <button type="button" class="list-group-item list-group-item-action delete-btn" data-id="${data.id}">Sil</button>

                </ul>
            </div>
            </div>
            
        </td>
        <td>${data.description}</td>
        <td>${data.priority}</td>
        <td>${dateFormat(data.dueBy)}</td>
        <td><div class="circle"></div></td>
    `;

    let menuButton = row.getElementsByClassName('menu-btn');
    menuButton[0].addEventListener('click', (e) => {
        e.stopPropagation();
        if(body[0].currentMenu != undefined){
            menuBtnClicked(body[0].currentMenu);
        }
        let menu = row.getElementsByClassName('menu-container');
        menuBtnClicked(menu[0]);
    })

    let deletebtn = row.getElementsByClassName('delete-btn');
    let editToDoBtn = row.getElementsByClassName('editToDo-btn');


    
    deletebtn[0].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const kutu = document.getElementById('toDoSil-container');
        removeDisplayNone(kutu);

        let label = kutu.getElementsByTagName('p');
        label[0].innerText = `${data.title} başlıklı to do'yu silmek istediğinize emin misiniz?`;
        let buttons = kutu.getElementsByTagName('button');

        buttons[0].addEventListener('click', (e) => {
            e.preventDefault();
            deleteProses(data);
            addDisplayNone(kutu);
        })

        buttons[1].addEventListener('click', (e) => {
            e.preventDefault();
            addDisplayNone(kutu);
        })

    })
    
    editToDoBtn[0].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const kutu = document.getElementById('editToDo-container');
        removeDisplayNone(kutu);

        const input = kutu.getElementsByTagName('input');
        const select = kutu.getElementsByTagName('select');
        input[0].value = data.title;
        input[1].value = data.description;
        select[0].value = data.priority;
        let date = new Date(data.dueBy);
        let str = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`
        input[2].value = str;

        const button = kutu.getElementsByTagName('button');
        button[0].addEventListener('click', (e) => {
            e.preventDefault();
            editToDo(input, select, data);
            addDisplayNone(kutu);
        })
        button[1].addEventListener('click', (e) => {
            e.preventDefault();
            addDisplayNone(kutu);
        })
    })

    let circle = row.getElementsByClassName('circle');

    if (data.done == true) {
        circle[0].classList.add('aktif-true');
    } else {
        circle[0].classList.add('aktif-false');
    }

    
    circle[0].addEventListener('click', (e) => {
        e.preventDefault();

        if (data.Aktif == true) {
            circle[0].classList.remove('aktif-true');
            circle[0].classList.add('aktif-false');
            data.done = false;
    
        } else {
            circle[0].classList.remove('aktif-false');
            circle[0].classList.add('aktif-true');
            data.done = true;
        }

        fetch(`${url}/todo/${data.id}`, {
                 method: 'PUT',
                 body: JSON.stringify(data),
                 headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization" : token,
                 }
             })
             .catch(err => console.log(err))
        })
    

    toDoListesiHTML.appendChild(row);
}

function deleteProses(data) {

    fetch(`${url}/todo/${data.id}`, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : token,
                
            }
        })
        .then(response => refreshTable())
        .catch(err => console.log(err))


}

function createNewToDo(input, select) {
    
    let temp = new Object();
    temp.title = input[0].value;
    temp.description = input[1].value;
    temp.priority = select;
    let date = new Date(input[2].value);
    temp.dueBy = date.toISOString();
    temp.username=kullanici;

    console.log(JSON.stringify(temp));

    fetch(`${url}/todo`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(temp),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : token,
            }
        }).then(resp => {
            setTimeout(function(){
                refreshTable();
            },500);
            
        })
        .catch(err => console.log(err));
}

function editToDo(input, select, data) {

    data.title = input[0].value;
    data.description = input[1].value;
    data.priority = select[0].value;
    let date = new Date(input[2].value)
    data.dueBy = date.toISOString();


    fetch(`${url}/todo/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : token,
            }
        })
        .then(response => refreshTable())
        .catch(err => console.log(err))

}

function removeDisplayNone(element) {
    element.classList.remove('d-none');
}

function addDisplayNone(element) {
    element.classList.add('d-none');
}

function addEventListeners() {

    let onlyNotDoneCheckbox = document.getElementById('onlyNotDoneCheckbox');
    console.log(onlyNotDoneCheckbox)
    
    toDoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const kutu = document.getElementById('toDo-container');
        removeDisplayNone(kutu);
        const input = kutu.getElementsByTagName('input');
        const select = kutu.getElementsByTagName('select');

        const button = kutu.getElementsByTagName('button');
        button[0].addEventListener('click', (e) => {
            e.preventDefault();
            createNewToDo(input, select[0].value);
            addDisplayNone(kutu)
        })
        button[1].addEventListener('click', (e) => {
            e.preventDefault();
            addDisplayNone(kutu);
        })
    });

    logoutbtn.addEventListener('click', (e)=>{
        e.preventDefault();
        logout();
    });

   

}

function dateFormat(dateString){
    let formatedDate = new Date(dateString);

    let result = `${formatedDate.getDate()}.${formatedDate.getMonth()+1}.${formatedDate.getFullYear()} 
                ${checkTime(formatedDate.getHours())}:${checkTime(formatedDate.getMinutes())}:${checkTime(formatedDate.getSeconds())}`;

    return result;
}

//Eğer 10'un altındaysa başına 0 eklemek.
function checkTime(i) {

    if (i < 10) {
      i = "0" + i;
    }
    return i;
}


function setKullaniciText(){
    let kullaniciText = document.getElementById('kullanici-text');
    let kullanici = window.getCookie('kullaniciAdi');

    kullaniciText.innerText =`${kullanici}`;
}

function menuBtnClicked(menu) {
    if (menu.classList.contains('d-none')) {
        menu.classList.remove('d-none');
        body[0].currentMenu = menu;
        body[0].addEventListener('click', bodyEvent);
        

    } else {
        menu.classList.add('d-none');
        body[0].removeEventListener('click', bodyEvent);
        body[0].currentMenu = undefined;
    }
}

function bodyEvent(e){
    e.preventDefault();
    menuBtnClicked(body[0].currentMenu);
}