document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username && password) {
        if(username == 'Caleb72' && password == '17123@Ca'){
            window.location.href = "Dashbord/dashbordHome.html";
        }
        else{
            alert("Invalid Username or Password")
        }
        
    } else {
        alert("Please fill in all fields");
    }
});