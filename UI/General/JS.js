let loader = document.querySelector('.loaderContainer');
function showLoader(){
  loader.style.display = "flex";
}

function hideLoader(){
  loader.style.display = "none";
}

console.log(localStorage.getItem('isLoggedIn'));

let messageSent = document.querySelector('.messageSent');

function showToast(message, type) {
  let toastDiv;
  if (type === 'success') {
    toastDiv = `<img src="../UI/Images/Checked.svg" class="check-img js-toast" alt=""> <div>${message}</div>`;
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = 'flex';
    setTimeout(() => {
      messageSent.style.display = 'none';
    }, 2000);
  } else {
    toastDiv = `<div>${message}</div>`;
    messageSent.style.backgroundColor = 'rgb(253, 114, 114)';
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = 'flex';
    setTimeout(() => {
      messageSent.style.display = 'none';
    }, 2000);
  }
}

document.querySelectorAll('.logout-btn').forEach(button => {
  button.addEventListener('click', function() {
      localStorage.removeItem('token');
      window.location.href = '../index.html';
  });
});




