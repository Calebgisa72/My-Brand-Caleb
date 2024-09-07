function blogActivites() {
  function BlogDisplay() {
    renderBlogs(blogs);
  }

  function renderBlogs(blogs) {
    let landingBlogs = ``;
    blogs.forEach((aBlog) => {
      let formatted = formatDate(aBlog.bDate);

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
                <button class="like-but js-like-but lik-but-${
                  aBlog._id
                }" onclick="handleLikeButtonClick('${aBlog._id}')">
                  <div class='thumbDiv'>
                    <img class="thumb" src="${
                      isBlogLiked(aBlog._id)
                        ? "Images/Liked.svg"
                        : "Images/Lik.svg"
                    }" alt="">
                  </div>
                </button>
                <div class="numOfLiks js-num-likes-${aBlog._id}">${
        aBlog.bNumOfLike
      }</div>
                <button class="like-but js-comment-button" title='Comments' onclick="viewAndScroll('${
                  aBlog._id
                }')">
                  <i class="fa-solid fa-comment thumb-comment"></i>
                </button>
              </div>
              <button onclick="viewBlogDetails('${
                aBlog._id
              }')" class="blogBut js-blog-but">
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

  BlogDisplay();

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
        const offset = targetId === "#home" ? 180 : 90;
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

  document.querySelectorAll(".moreProjectsButtongeBut").forEach((anchor) => {
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
}

function isBlogLiked(blogId) {
  const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
  return likedBlogs.includes(blogId);
}

async function toggleLike(blogId) {
  const likeButton = document.querySelector(`.lik-but-${blogId}`);
  const thumbImage = likeButton.querySelector(".thumb");
  const isLiked = isBlogLiked(blogId);
  const url = `https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogId}/${
    isLiked ? "disLike" : "like"
  }`;

  try {
    updateBlogLikes(blogId, isLiked ? -1 : 1);
    updateLikeStatus(!isLiked, likeButton, thumbImage, blogId);
    const response = await fetch(url, { method: "POST" });
    await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateLikeStatus(isLiked, likeButton, thumbImage, blogId) {
  const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
  const numOfLikesElement = likeButton.nextElementSibling;

  if (isLiked) {
    numOfLikesElement.textContent = parseInt(numOfLikesElement.textContent) + 1;
    thumbImage.src = "Images/Liked.svg";
    likedBlogs.push(blogId);
  } else {
    numOfLikesElement.textContent = parseInt(numOfLikesElement.textContent) - 1;
    thumbImage.src = "Images/Lik.svg";
    const index = likedBlogs.indexOf(blogId);
    likedBlogs.splice(index, 1);
  }

  localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
}

function updateBlogLikes(blogId, increment) {
  blogs = blogs.map((blog) => {
    if (blog._id === blogId) {
      return { ...blog, bNumOfLike: blog.bNumOfLike + increment };
    }
    return blog;
  });
}

async function handleLikeButtonClick(blogId) {
  await toggleLike(blogId);
}

async function sendComment(event, id) {
  event.preventDefault();
  const blogCommentedOn = blogs.find((blog) => blog._id === id);
  if (!blogCommentedOn) return;
  const commentWritten = document.querySelector(".js-write-comment").value;
  const nameWritten = document.querySelector(".js-write-name").value;

  if (commentWritten.trim() !== "" && nameWritten.trim() !== "") {
    try {
      let newComment = {
        sender: nameWritten,
        comment: commentWritten,
      };

      blogs = blogs.map((blog) => {
        if (blog._id === id) {
          const updateComments = [...blog.bComments, newComment];
          return { ...blog, bComments: updateComments };
        } else {
          return blog;
        }
      });

      viewBlogDetails(id);
      document.querySelector(".js-write-comment").value = "";
      document.querySelector(".js-write-name").value = "";

      await fetch(
        `https://my-brand-backend-iyxk.onrender.com/api/blogs/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
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

function viewBlogDetails(id, shouldScroll = false) {
  const viewBlog = document.querySelector(".viewBlog");
  viewBlog.style.display = "none";
  const blogToView = blogs.find((blog) => blog._id === id);
  if (!blogToView) return;
  let commentsHTML = "";

  let formatted = formatDate(blogToView.bDate);

  allComments = blogToView.bComments;
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
                class="like-but js-like-but lik-but-${id}"
                onclick="handleLikeButtonClick('${blogToView._id}')"
              >
                <div>
                  <img class="thumb" src="${
                    isBlogLiked(blogToView._id)
                      ? "Images/Liked.svg"
                      : "Images/Lik.svg"
                  }" alt="">
                </div>
              </button>
              <div class="numOfLiks js-num-likes-${blogToView._id}">
                ${blogToView.bNumOfLike}
              </div>
              <button
              title='Comments'
                class="like-but js-comment-button"
                onclick="scrollToComments('${blogToView._id}')"
              >
              <i class="fa-solid fa-comment thumb-comment"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="botDesc">${blogToView.bLongDesc}</div>
      </div>
    
      <div class="blogRight">
        <div id="comments-${blogToView._id}" class="botComment">
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
                onclick="sendComment(event, '${blogToView._id}')"
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
    scrollToComments(blogToView._id);
  }
}

function viewAndScroll(id) {
  viewBlogDetails(id, true);
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
  const viewBlog = document.querySelector(".viewBlog");
  viewBlog.style.display = "none";
}
