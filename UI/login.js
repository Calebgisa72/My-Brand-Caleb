let authToken;
document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    var userUsername = document.getElementById("username").value;
    var userpassword = document.getElementById("password").value;
    let invalid = document.querySelector(".invalid");

    const loginUser = {
        username: userUsername,
        password: userpassword
    };

    fetch("https://my-brand-backend-iyxk.onrender.com/api/auth/signin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser),
    })
    .then(async (res) =>{
        const data = await res.json();
        if(data.message === "Signed in successfully"){
            authToken = data.token;
            localStorage.setItem('token', authToken);
            window.location.href = "Dashbord/dashbordHome.html";
        }
        else if(data.message === "Invalid username or password"){
            invalid.style.display = 'inline-block';
        }
        else{
            alert("Internal server error");
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
    
});