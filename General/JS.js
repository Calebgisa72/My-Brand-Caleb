let loader = document.querySelector(".loaderContainer");
function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

let messageSent = document.querySelector(".messageSent");

function showToast(message, type) {
  let toastDiv;
  if (type === "success") {
    toastDiv = `<img src="../Images/Checked.svg" class="check-img js-toast" alt=""> <div>${message}</div>`;
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = "flex";
    setTimeout(() => {
      messageSent.style.display = "none";
    }, 2000);
  } else {
    toastDiv = `<div>${message}</div>`;
    messageSent.style.backgroundColor = "rgb(253, 114, 114)";
    messageSent.innerHTML = toastDiv;
    messageSent.style.display = "flex";
    setTimeout(() => {
      messageSent.style.display = "none";
    }, 2000);
  }
}

const themeIcon = document.querySelector(".js-theme-icon");
const body = document.body;
const logoDiv = document.querySelector(".js-logo");

const defaultTheme = window.innerWidth < 900 ? "dark" : "light";

let theme = localStorage.getItem("theme") || defaultTheme;

function applyTheme(theme) {
  if (theme === "light") {
    themeIcon.innerHTML = "<i title='Night Mode' class='fa-solid fa-moon'></i>";
    body.classList.add("light");
  } else {
    themeIcon.innerHTML = "<i title='Light Mode' class='fa-solid fa-star'></i>";
    body.classList.remove("light");
  }
}

applyTheme(theme);

themeIcon.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

function timeAgo(inputDate) {
  const now = new Date();
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }
}

const portfolioHtml = `
<div class="menus">

      <div class="homeDiv">
        <div class="home" id="home">
          <div class="welcome">
            <div>
              <div class="salutation js-salutation"></div>
              <div class="name js-myName"></div>
            </div>

            <div class="descri js-myDescription"></div>
            <div class="buttons">
              <a href="#contact" class="engageBut"
                ><button class="engage">Engage my services</button></a
              >
              <a href="./public/Caleb's CV 2.4.pdf" download class="cv">
                <i class="fa-solid fa-download"></i> Download CV
              </a>
            </div>
          </div>
          <div class="profile js-profileImgDiv"></div>
        </div>
      </div>

      <div class="about" id="about">
        <div class="sub-about">
          <div class="words">
            <h4 class="js-aboutHeading"></h4>
            <div class="about-social">
              <div class="aboutDescriptions">
                <div class="abou">
                  <div class="aboutSchool">
                    <div class="aboutModel">
                      <img
                        style="width: 50px"
                        src="public/icons8-experience-100.png"
                        alt=""
                      />
                      <div class="schoolText">
                        <p class="js-experience" style="text-align: center"></p>
                        <p style="text-align: center">of Experince</p>
                      </div>
                    </div>
                    <div class="aboutModel">
                      <img
                        style="width: 50px"
                        src="public/icons8-graduation-96.png"
                        alt=""
                      />
                      <div class="schoolText" style="align-items: center">
                        <p style="text-align: center" class="js-course"></p>
                        <p style="text-align: center">University of Rwanda</p>
                      </div>
                    </div>
                  </div>
                  <div class="tet js-aboutText"></div>
                </div>
              </div>
              <div class="su-about">
                <div class="social">
                  <a
                    title="Facebook"
                    href="https://web.facebook.com/gisa.ccaleb.31/"
                    ><div class="lin">f</div></a
                  >
                  <a href="https://github.com/Calebgisa72"
                    ><i title="Github" class="fa-brands fa-github lin"></i
                  ></a>
                  <a href="https://www.instagram.com/calbeats_official/"
                    ><div class="lin">
                      <img src="Images/Social (1).svg" alt="" /></div
                  ></a>
                  <a href="https://twitter.com/GisaCcaleb"
                    ><div class="lin">
                      <i class="fa-brands fa-x-twitter"></i></div
                  ></a>
                  <a
                    href="https://www.linkedin.com/in/caleb-pacifique-gisa-mugisha-7567b9347"
                    ><div class="lin">in</div></a
                  >
                </div>
                <a href="#portfolio" class="js-moreProjectsButton"
                  ><button class="morePoj">My Projects</button></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="skills" id="skills">
        <div class="f4">My Technical Skills.</div>

        <div class="allSkill js-skillsDiv"></div>
        <div class="viewMoreSkills">
          <button class="morePoj js-moreSkills">View All Skills</button>
        </div>
      </div>

      <div class="sub-container">
        <div class="port" id="portfolio">
          <div class="portText">
            <h4 style="font-size: 23px; color: #ffffff">Portfolio</h4>
            <div style="font-weight: 500; font-size: 17px">
              Presentation of My Wide Range of Digital Projects
            </div>
          </div>
          <div class="my-proj js-projectsDiv"></div>
          <button class="morePoj js-moreProjects">More Projects</button>
        </div>

        <div class="viewProject js-projectDetails"></div>

        <div class="viewBlog js-view-blog-Detailed"></div>

        <div class="blog" id="blog">
          <div class="blogTitle">Blogs</div>

          <div class="slide-container swiper">
            <div class="slide-content js-blogs">
              <div class="loaderContainer">
                <span class="loader"></span>
              </div>
            </div>
            <div class="next-but swiper-button-next"></div>
            <div class="prev-but swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
        </div>

        <div class="contact" id="contact">
          <div class="contTitle">
            <div class="contactTitle">Connect With Me.</div>
            <div class="contDet">
              Let's Discuss Your Project and Dive Into It !
            </div>
          </div>
          <div class="info">
            <div class="myInfo">
              <div class="infoMine">
                <div class="myAddresss">
                  <img class="addImage" src="Images/Frame 50.svg" alt="" />
                  <div class="detail">
                    <div class="firstDet">Address:</div>
                    <div class="secondDet">Kigali-Rwanda</div>
                  </div>
                </div>

                <div class="myAddres">
                  <img class="addImage" src="Images/Frame 51.svg" alt="" />
                  <div class="detail">
                    <div class="firstDet">My Email:</div>
                    <div class="secondDet">gisacaleb72@gmail.com</div>
                  </div>
                </div>

                <div class="myAddress">
                  <img class="addImage" src="Images/Frame 52.svg" alt="" />
                  <div class="detail">
                    <div class="firstDet">Call Me Now:</div>
                    <div class="secondDet">0780288454</div>
                  </div>
                </div>
              </div>
              <div class="social">
                <a
                  title="Facebook"
                  href="https://web.facebook.com/gisa.ccaleb.31/"
                  ><div class="lin">f</div></a
                >
                <a href="https://github.com/Calebgisa72"
                  ><i title="Github" class="fa-brands fa-github lin"></i
                ></a>
                <a href="https://www.instagram.com/calbeats_official/"
                  ><div class="lin">
                    <img src="Images/Social (1).svg" alt="" /></div
                ></a>
                <a href="https://twitter.com/GisaCcaleb"
                  ><div class="lin">
                    <i class="fa-brands fa-x-twitter"></i></div
                ></a>
                <a
                  href="https://www.linkedin.com/in/caleb-pacifique-gisa-mugisha-7567b9347"
                  ><div class="lin">in</div></a
                >
              </div>
            </div>
            <div class="visitorInfo">
              <div class="visiTitle">Your Information & Message</div>
              <form class="visitForm" id="form" action="">
                <div class="visiForm">
                  <div class="tte">
                    Name:<span style="color: red">*</span> :
                  </div>
                  <div class="nameInputDiv">
                    <input
                      class="textInput js-sender-name"
                      type="text"
                      name="sName"
                      placeholder="Enter your name"
                      required
                    />
                    <div class="noName">Failed. Enter Your Name.</div>
                  </div>

                  <div class="tte">
                    Email:<span style="color: red">*</span> :
                  </div>
                  <div class="emailInputDiv">
                    <input
                      class="textInput em-ail js-sender-email"
                      type="text"
                      name="sEmail"
                      placeholder="Enter your email"
                      required
                    />
                    <div class="badEmail">Failed. Enter a Valid Email</div>
                  </div>

                  <div class="tte">Location :</div>
                  <div class="inputDiv">
                    <input
                      class="textInput js-sender-location"
                      name="sLocation"
                      placeholder="Enter your location"
                      type="text"
                    />
                  </div>
                  <div class="tte">
                    Message<span style="color: red">*</span> :
                  </div>
                  <div class="messageInputContainer">
                    <div class="messageInputDiv inputDiv">
                      <textarea
                        class="messageText messageInput em-ail js-sender-message"
                        name="message"
                        id=""
                        cols="35"
                        rows="7.5"
                        placeholder="Type in your message!!"
                        required
                      ></textarea>
                    </div>
                    <div class="badMessage">
                      Failed. Write more than 10 words
                    </div>
                  </div>
                </div>
                <div class="js-messageSubmit"></div>
              </form>
            </div>
          </div>
        </div>

        <div class="messageSent"></div>
      </div>
      <div class="footter">
      <a href="index.html">
      <div class="logoFooter">
        <p class="logoName logoFooterName">&lt;<strong class="dev">Caleb</strong>.dev /&gt;</p>
      </div>
      </a>

        <div class="links">
          <a href="#home" class="footer-menu-link js-menu-link">Home</a>
          <a href="#about" class="footer-menu-link js-menu-link">About</a>
          <a href="#skills" class="footer-menu-link js-menu-link">Skills</a>
          <a href="#portfolio" class="footer-menu-link js-menu-link"
            >Portfolio</a
          >
          <a href="#blog" class="footer-menu-link js-menu-link">Blog</a>
          <a href="#contact" class="footer-menu-link js-menu-link"
            >Contact Us</a
          >
        </div>
      </div>
    </div>
`;
