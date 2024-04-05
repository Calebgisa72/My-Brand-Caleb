document.addEventListener("DOMContentLoaded", function() {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
        window.location.href = '../login.html';
    }
});