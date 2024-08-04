let blogButton;

function BlogDisplay() {
  showLoader();
  fetch("https://my-brand-backend-iyxk.onrender.com/api/blogs", {
    method: "GET",
  })
    .then(async (res) => {
      const data = await res.json();
      hideLoader();
      allBlogs = data;

      renderBlogs(allBlogs);

      blogButton = document.querySelectorAll(".js-blog-but");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function renderBlogs(blogs) {
  let landingBlogs = ``;
  blogs.forEach((aBlog, index) => {
    const dateString = aBlog.bDate;
    const dateObject = new Date(dateString);
    let formatted = formatDate(dateObject);

    landingBlogs += `
      <div class="swiper-slide">
        <div class="blogImage">
          <img class="blogImg" src="${aBlog.bImage}" alt="">
        </div>
        <div class="blogDate">${formatted}</div>
        <div class="bloggTitle">${aBlog.bTitle}</div>
        <div class="justifyBlog">
          <div class="blogDesc">${aBlog.bShortDesc}</div>
          <div class="blogInteractions">
            <div class="blogFeedback">
              <button class="like-but js-like-but lik-but-${index}" onclick="handleLikeButtonClick(${index}, '${aBlog._id}')">
                <div>
                  <img class="thumb" src="${isBlogLiked(aBlog._id) ? "Images/Liked.svg" : "Images/Lik.svg"}" alt="">
                </div>
              </button>
              <div class="numOfLiks js-num-likes-${index}">${aBlog.bNumOfLike}</div>
              <button class="like-but js-comment-button" title='Comments' onclick="viewAndScroll(${index})">
                <i class="fa-solid fa-comment thumb-comment"></i>
              </button>
            </div>
            <button onclick="viewBlogDetails(${index})" class="blogBut js-blog-but">
              View More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  const blogsWrapper = document.querySelector(".js-blogs");
  if (blogsWrapper) {
    blogsWrapper.innerHTML = `<div class="card-wrapper swiper-wrapper">${landingBlogs}</div>`;
    initializeSwiper(blogs.length);
  }
}

function initializeSwiper(blogCount) {
  if (blogCount > 1) {
    var swiper = new Swiper(".slide-content", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      fade: true,
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
        dynamicBullets: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },
        920: {
          slidesPerView: 3,
        },
      },
    });
  }
}

function isBlogLiked(blogId) {
  const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
  return likedBlogs.includes(blogId);
}

async function toggleLike(index, blogId) {
  const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
  const likeButton = document.querySelector(`.lik-but-${index}`);
  const thumbImage = likeButton.querySelector(".thumb");

  try {
    showLoader();
    const url = isBlogLiked(blogId)
      ? `https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogId}/disLike`
      : `https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogId}/like`;

    const response = await fetch(url, {
      method: "POST",
    });

    const data = await response.json();
    hideLoader();

    updateLikeStatus(isBlogLiked(blogId), likeButton, thumbImage, index, blogId);
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateLikeStatus(isLiked, likeButton, thumbImage, index, blogId) {
  const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];

  if (isLiked) {
    const updatedLikes = parseInt(likeButton.nextElementSibling.textContent) - 1;
    likeButton.nextElementSibling.textContent = updatedLikes;
    thumbImage.src = "Images/Lik.svg";
    const updatedLikedBlogs = likedBlogs.filter((id) => id !== blogId);
    localStorage.setItem("likedBlogs", JSON.stringify(updatedLikedBlogs));
  } else {
    const updatedLikes = parseInt(likeButton.nextElementSibling.textContent) + 1;
    likeButton.nextElementSibling.textContent = updatedLikes;
    thumbImage.src = "Images/Liked.svg";
    likedBlogs.push(blogId);
    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
  }
}

async function handleLikeButtonClick(index, blogId) {
  await toggleLike(index, blogId);
}

BlogDisplay();

const viewBlog = document.querySelector(".viewBlog");

async function sendComment(event, index) {
  event.preventDefault();
  const blogCommentedOn = allBlogs[index];
  let id = blogCommentedOn._id;
  const commentWritten = document.querySelector(".js-write-comment").value;
  const nameWritten = document.querySelector(".js-write-name").value;

  if (commentWritten.trim() !== "" && nameWritten.trim() !== "") {
    try {
      let newComment = {
        sender: nameWritten,
        comment: commentWritten,
      };
      showLoader();
      const response = await fetch(
        `https://my-brand-backend-iyxk.onrender.com/api/blogs/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      const data = await response.json();
      hideLoader();

      if (data.message === "Comment added successfully") {
        showToast("Comment added", "success");
        document.querySelector(".js-write-comment").value = "";
        document.querySelector(".js-write-name").value = "";
        viewBlogDetails(index);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    showToast("Please fill in both the comment and your name.", "error");
  }
}

function showNameInput() {
  const nameInput = document.querySelector(".js-write-name");
  nameInput.style.display = "block";
}

function hideNameInput() {
  const commentInput = document.querySelector(".js-write-comment");
  const nameInput = document.querySelector(".js-write-name");
  if (!commentInput.value.trim()) {
    nameInput.style.display = "none";
  }
}

function viewBlogDetails(index, shouldScroll = false) {
  index = index || 0;
  const blogToView = allBlogs[index];
  let id = blogToView._id;
  let commentsHTML = "";

  const dateString = blogToView.bDate;
  const dateObject = new Date(dateString);
  let formatted = formatDate(dateObject);

  showLoader();
  fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${id}/comments`, {
    method: "GET",
  })
    .then(async (res) => {
      const data = await res.json();
      hideLoader();
      allComments = data;
      allComments.forEach((comment) => {
        commentsHTML += `
          <div class="oneCom">
              <div class="comDetails">
                  <div class="comSender">${comment.sender}</div>
                  <div>${comment.comment}</div>
              </div>
          </div>
        `;
      });

      const blogDetails = `
      <div class="singleBlogDiv">
        <div class="topContainer">
          <div class="cancleDiv">
            <button class="canelBut" onclick="cancleViewBlog()">x</button>
          </div>
        </div>
      
        <div class="blogLeft">
          <div class="topDesc">
            <img class="blImage" src="${blogToView.bImage}" alt="" />
            <div class="bllDesc">
              <div class="blTitle">${blogToView.bTitle}</div>
              <div class="blDesc">${blogToView.bShortDesc}</div>
              <div class="blDate">${formatted}</div>
              <div class="blIcon">
                <button
                  class="like-but js-like-but lik-but-${index}"
                  onclick="handleLikeButtonClick(${index}, '${blogToView._id}')"
                >
                  <div>
                    <img class="thumb" src="${
                      isBlogLiked(blogToView._id)
                        ? "Images/Liked.svg"
                        : "Images/Lik.svg"
                    }" alt="">
                  </div>
                </button>
                <div class="numOfLiks js-num-likes-${index}">
                  ${blogToView.bNumOfLike}
                </div>
                <button
                title='Comments'
                  class="like-but js-comment-button"
                  onclick="scrollToComments(${index})"
                >
                <i class="fa-solid fa-comment thumb-comment"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="botDesc">${blogToView.bLongDesc}</div>
        </div>
      
        <div class="blogRight">
          <div id="comments-${index}" class="botComment">
            <div class="comHead">Comment Section</div>
            <div class="comments">
              <div class="commentHTML">${commentsHTML}</div>
            </div>
            <form action="">
              <div class="writer">
                <div class="commentSenderinputs">
                    <input
                    required
                    type="text"
                    name="comment"
                    class="write js-write-comment"
                    placeholder="Add Comment ..."
                    />
                    <input
                    required
                    type="text"
                    name="sender"
                    class="write-name js-write-name"
                    placeholder="Your Name"
                    />
                </div>
                <button
                  class="someButs js-send-comment"
                  onclick="sendComment(event, ${index})"
                >
                <i title='Send Comment' class="fa-regular fa-paper-plane blSend"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      `;

      document.querySelector(".js-view-blog-Detailed").innerHTML = blogDetails;
      viewBlog.style.display = "flex";

      const commentInput = document.querySelector(".js-write-comment");
      if (commentInput) {
        commentInput.addEventListener("focus", () => {
          const nameInput = document.querySelector(".js-write-name");
          if (!commentInput.value.trim()) {
            nameInput.style.display = "block";
          }
        });
      }

      const nameInput = document.querySelector(".js-write-name");
      if (nameInput) {
        nameInput.addEventListener("focus", showNameInput);
        nameInput.addEventListener("blur", hideNameInput);
      }

      if (shouldScroll) {
        scrollToComments(index);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function viewAndScroll(index) {
  viewBlogDetails(index, true);
}

function scrollToComments(index) {
  const commentsSection = document.getElementById(`comments-${index}`);
  if (commentsSection) {
    commentsSection.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function cancleViewBlog() {
  viewBlog.style.display = "none";
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileLayer = document.getElementById("mobile-layer");
const closeBtn = document.getElementById("closeBtn");

let showMobileBar = false;

document.querySelectorAll(".js-menu-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offset = 90;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    mobileLayer.style.display = "none";
    showMobileBar = false;
  });
});

document.querySelectorAll(".engageBut").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offset = 90;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

hamburgerBtn.addEventListener("click", () => {
  handleViewMobileBar();
});

closeBtn.addEventListener("click", () => {
  handleViewMobileBar();
});

const handleViewMobileBar = () => {
  showMobileBar = !showMobileBar;
  if (showMobileBar) {
    mobileLayer.style.display = "flex";
    requestAnimationFrame(() => {
      mobileLayer.classList.add("open");
    });
  } else {
    mobileLayer.classList.remove("open");
    setTimeout(() => {
      mobileLayer.style.display = "none";
    }, 300);
  }
};
