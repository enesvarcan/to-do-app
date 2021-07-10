function goLoginPage(){
    let url = document.location.origin;
    url += '/Page/login.html';
    location.replace(url);
}

function checkLoggedIn(){
    let kullanici = window.getCookie('kullaniciAdi');

    if(kullanici == undefined){
        goLoginPage();
    }
}

function logout(){
    //COOKİE'DEKİ VERİ SIFIRLANIR
    document.cookie = `kullaniciAdi=; 18 Dec 2000 12:00:00 UTC`;
    document.cookie = `token=; 18 Dec 2000 12:00:00 UTC`
    
    goLoginPage();
}