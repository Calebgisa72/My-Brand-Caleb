const changeForm = document.querySelector('.change-form');
const changeBut = document.querySelector('.change-but');
const cancleBut = document.querySelector('.canelBut');

changeBut.addEventListener('click', function() {
    changeForm.style.display = 'flex';
  });

  cancleBut.addEventListener('click', function() {
    changeForm.style.display = 'none';
  });