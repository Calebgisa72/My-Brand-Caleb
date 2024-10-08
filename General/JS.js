const currentPath = window.location.pathname;
const userSideDiv = document.getElementById("userSide");

if (currentPath === "/") {
  userSideDiv.innerHTML = ` <div class="header">
  <a href="index.html"
    ><div class="logo">
      <img class="logo-img" src="Images/Ellipse 1.svg" alt="" />
      <div class="js-logo"></div></div
  ></a>

  <div class="theme-links">
    <div class="theme-icon js-theme-icon"></div>

    <div class="links">
      <a href="#home" class="menu-link js-menu-link">Home</a>
      <a href="#about" class="menu-link js-menu-link">About</a>
      <a href="#skills" class="menu-link js-menu-link">Skills</a>
      <a href="#portfolio" class="menu-link js-menu-link">Portfolio</a>
      <a href="#blog" class="menu-link js-menu-link">Blog</a>
      <a href="#contact" class="menu-link js-menu-link">Contact Us</a>
    </div>
    <button class="hamburger-btn" id="hamburgerBtn">&#9776;</button>
  </div>
</div>

<div class="mobile-layer" id="mobile-layer">
  <div class="mobile-navbar">
    <button class="close-btn" id="closeBtn">&times;</button>
    <div class="mobile-navbar-links">
      <a href="#home" class="menu-link js-menu-link mobile-menu-link"
        >Home</a
      >
      <a href="#about" class="menu-link js-menu-link">About</a>
      <a href="#skills" class="menu-link js-menu-link">Skills</a>
      <a href="#portfolio" class="menu-link js-menu-link">Portfolio</a>
      <a href="#blog" class="menu-link js-menu-link">Blog</a>
      <a href="#contact" class="menu-link js-menu-link">Contact Us</a>
    </div>
  </div>
</div>

<div class="menus">
  <div class="loaderContainer">
    <span class="loader"></span>
  </div>

  <div class="homeDiv">
    <div class="home" id="home">
      <div class="welcome">
        <div>
          <div class="name">Hello, I’m</div>
          <div class="name">Gisa M. Caleb</div>
        </div>

        <div class="descri">
          Based in <span class="boold">Kigali, Rwanda</span>, I'm a
          <span class="boold">software engineer and UI/UX designer</span>
          who Crafts exceptional <span class="boold">Websites</span> and
          <span class="boold">Mobile apps</span> with technical expertise
          and creative vision. Let's create something extraordinary
          together.
        </div>
        <div class="buttons">
          <a href="#contact" class="engageBut"
            ><button class="engage">Engage my services</button></a
          >
          <a href="./public/Caleb's CV 1.7.pdf" download class="cv">
            <i class="fa-solid fa-download"></i> Download CV
          </a>
        </div>
      </div>
      <img class="profile" src="Images/Rectangle 1.svg" alt="" />
    </div>
  </div>

  <div class="about" id="about">
    <div class="sub-about">
      <div class="words">
        <div class="subHeading">Know Me Better.</div>
        <div class="abou">
          <div class="tet">
            Hey there! I'm Gisa Mugisha Caleb, a web developer from
            Kigali, Rwanda. I got into coding in 2021 and have been
            soaking up knowledge ever since. Right now, I'm deep into the
            Andela program, sharpening my skills and know-how in software
            engineering.
          </div>
          <div class="tet">
            I've been busy with software projects, crafting cool user
            interfaces and building strong backend systems. Alongside
            coding, I spent six months as a custom declarant.
          </div>
          <div class="tet">
            When I'm not coding, you might catch me making music
            beats—it's my way of unwinding and getting creative. I'm all
            about bringing ideas to life through code and rhythm. Let's
            team up and make some magic happen!
          </div>
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
            href="https://www.linkedin.com/in/caleb-pacifique-gisa-mugisha-04ab21236/"
            ><div class="lin">in</div></a
          >
        </div>
        <button class="cv">My Projects</button>
      </div>
    </div>
  </div>

  <div class="skills" id="skills">
    <div class="f4">My Technical Skills.</div>

    <div class="allSkill">
      <div
        class="skillCard"
        style="background: linear-gradient(to right, #522272, #1c42a0)"
      >
        <img class="skillIcon" src="Images/Atom.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">3 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">React</div>
          <div class="skillDesc">
            React is a popular JavaScript library for building user
            interfaces, particularly single-page applications. Enabling
            the creation of dynamic and interactive web applications with
            ease
          </div>
        </div>
        <div class="certification">Redux, React testing library</div>
      </div>

      <div class="skillCard" style="background-color: rgb(10, 94, 154)">
        <img class="skillIcon" src="Images/Css.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">4 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">CSS</div>
          <div class="skillDesc">
            CSS (Cascading Style Sheets) brings life to web pages by
            defining their visual presentation. Proficient in CSS, I can
            skillfully design and style elements.
          </div>
        </div>
        <div class="certification">Vanilla Css, Tailiwindcss</div>
      </div>

      <div class="skillCard" style="background-color: rgb(116, 106, 6)">
        <img class="skillIcon" src="Images//Js.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">4 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">JavaScipt</div>
          <div class="skillDesc">
            I'm experienced in JavaScript, using it to make web pages
            interactive and dynamic.
          </div>
        </div>
        <div class="certification">Javascript, Typescript</div>
      </div>

      <div class="skillCard" style="background-color: rgb(148, 62, 4)">
        <img class="skillIcon" src="Images/Html 5.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">4 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">HTML</div>
          <div class="skillDesc">
            HTML (Hypertext Markup Language) is the backbone of any web
            page, providing the structure and organization
          </div>
        </div>
        <div class="certification">Certifications: HTML5 Specialist</div>
      </div>

      <div
        class="skillCard"
        style="
          background: linear-gradient(
            to right,
            rgb(20, 113, 26),
            #044a3d
          );
        "
      >
        <img class="skillIcon" src="Images/Nodejs.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">3 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">Node js</div>
          <div class="skillDesc">
            Node.js is a powerful, open-source runtime environment that
            allows you to execute JavaScript on the server side. It is
            known for its event-driven, non-blocking I/O model, which
            makes it efficient and scalable for building fast, scalable
            network applications.
          </div>
        </div>
        <div class="certification">Express js, RestAPI</div>
      </div>

      <div class="skillCard" style="background-color: rgb(20, 80, 113)">
        <img class="skillIcon" src="Images/Database.svg" />
        <div class="cardDetails">
          <div class="smallDetails">
            <div class="Htime">4 Years ago</div>
            <span>&#183;</span>
            <div class="skillLevel">Proficiency: Advanced</div>
          </div>
          <div class="skillTitle">Databases (MongoDB, PostgreSQL)</div>
          <div class="skillDesc">
            Proficient in working with both relational and non-relational
            databases. Capable of designing and optimizing databases for
            performance and scalability.
          </div>
        </div>
        <div class="certification">TypeOrm, PrismaOrm</div>
      </div>
    </div>
  </div>

  <div class="sub-container">
    <div class="port" id="portfolio">
      <div class="portText">
        <div class="portfolio-heading">Portfolio</div>
        <div style="font-weight: 500">
          Presentation of My Wide Range of Digital Projects
        </div>
      </div>
      <div class="my-proj">
        <div class="proj">
          <div class="projImage">
            <img
              class="projImg"
              src="Images/unsplash_9anj7QWy-2g.svg"
              alt=""
            />
          </div>
          <div class="projTitle">Whatsapp-Clone</div>
          <div class="projDesc">
            A replica of the popular messaging app, allowing users to send
            messages, images, and videos in real-time, with features like
            group chats and media sharing.
          </div>
        </div>
        <div class="proj">
          <div class="projImage">
            <img
              class="projImg"
              src="Images/unsplash_C5DLhUkEWfM.svg"
              alt=""
            />
          </div>
          <div class="projTitle">Kigali Online Shop</div>
          <div class="projDesc">
            An online shopping platform tailored for Kigali residents ,
            offering a wide range of products with easy navigation and
            secure checkout.
          </div>
        </div>
        <div class="proj">
          <div class="projImage">
            <img
              class="projImg"
              src="Images/unsplash_9anj7QWy-2g (1).svg"
              alt=""
            />
          </div>
          <div class="projTitle">Rock-Paper-Scissors Game</div>
          <div class="projDesc">
            A digital version of the classic hand game, allowing users to
            play against the computer or with friends online.
          </div>
        </div>
      </div>
      <button class="morePoj">More Projects</button>
    </div>

    <div class="viewBlog js-view-blog-Detailed"></div>

    <div class="blog" id="blog">
      <div class="blogTitle">Blog</div>

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
        <div class="contactTitle">Connect With Us.</div>
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
              href="https://www.linkedin.com/in/caleb-pacifique-gisa-mugisha-04ab21236/"
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

    <div class="footter">
      <a href="index.html"
        ><div class="logo">
          <img class="logo-img" src="Images/Ellipse 1.svg" alt="" />
          <div class="js-logo">
            <img
              class="logo-name"
              src="Images/Caleb’s Brand (1).svg"
              alt=""
            />
          </div></div
      ></a>

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
</div>`;
} else {
  userSideDiv.style.display = "none";
}

let loader = document.querySelector(".loaderContainer");
function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

console.log(localStorage.getItem("isLoggedIn"));

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

document.querySelectorAll(".logout-btn").forEach((button) => {
  button.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
  });
});

const themeIcon = document.querySelector(".js-theme-icon");
const body = document.body;
const logoDiv = document.querySelector(".js-logo");

let theme = localStorage.getItem("theme") || "dark";

function applyTheme(theme) {
  if (theme === "light") {
    themeIcon.innerHTML = "<i title='Night Mode' class='fa-solid fa-moon'></i>";
    body.classList.add("light");
    logoDiv.innerHTML =
      '<img class="logo-name" src="Images/Caleb’s Brand (2).svg" alt="" />';
  } else {
    themeIcon.innerHTML = "<i title='Light Mode' class='fa-solid fa-star'></i>";
    body.classList.remove("light");
    logoDiv.innerHTML =
      '<img class="logo-name" src="Images/Caleb’s Brand (1).svg" alt="" />';
  }
}

applyTheme(theme);

themeIcon.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});
