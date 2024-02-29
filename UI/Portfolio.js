const viewBlog = document.querySelector('.viewBlog');
const blogButton = document.querySelector('.js-blog-but');
const cancleBut = document.querySelector('.canelBut');

blogButton.addEventListener('click', function() {
    viewBlog.style.display = 'flex';
  });

  cancleBut.addEventListener('click', function() {
    viewBlog.style.display = 'none';
  });


// Smooth scrolling for anchor links with class
document.querySelectorAll('.menu-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.engageBut').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
          targetSection.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

const navbarLinks = document.getElementById('navbarLinks');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNavbar = document.getElementById('mobileNavbar');
const closeBtn = document.getElementById('closeBtn');

hamburgerBtn.addEventListener('click', function() {
  mobileNavbar.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  mobileNavbar.style.display = 'none';
});


var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween:30,
  loop:true,
  fade:true,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets:true,
  },
  breakpoints:{
   0:{
  slidesPerView: 1,
   },
   520:{
  slidesPerView: 2,
   },
   920:{
  slidesPerView: 3,
   }
  },
});





