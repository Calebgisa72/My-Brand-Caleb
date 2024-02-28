document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let invalid = document.querySelector(".invalid");

    if (username && password) {
        if(username == 'Caleb72' && password == '17123@Ca'){
            window.location.href = "Dashbord/dashbordHome.html";
        }
        else{
            invalid.style.display = 'inline-block';
        }
        
    } else {
        direct.style.display = 'inline-block';
    }
});