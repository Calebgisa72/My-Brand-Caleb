let blogButton;

function BlogDisplay() {
    fetch("https://my-brand-backend-iyxk.onrender.com/api/blogs", {
            method: "GET",
        })
        .then(async(res) => {
            const data = await res.json();
            allBlogs = data;

            let landingBlogs = '';
            allBlogs.forEach((aBlog, index) => {

                const dateString = aBlog.bDate;
                const dateObject = new Date(dateString);
                let formated = formatDate(dateObject);

                landingBlogs += `
                    <div class="swiper-slide">
                        <div class="blogImage"><img class="blogImg" src="${aBlog.bImage}" alt=""></div>
                        <div class="blogDate">${formated}</div>
                        <div class="bloggTitle">${aBlog.bTitle}</div>
                        <div class="blogDesc">${aBlog.bShortDesc}</div>
                        <div class="blogFeedback">
                            <button class="like-but js-like-but lik-but-${index}" onclick="likingBlog(${index})">
                                <div><img class="thumb" src="Images/Lik.svg" alt=""></div>
                            </button>
                            <div class="numOfLiks js-num-likes-${index}">${aBlog.bNumOfLike}</div>
                            <a href="#comments" class="menu-link"><button class="like-but js-comment-but"><img class="thumbs" src="Images/Comment.svg" alt=""></button></a>
                        </div>
                        <button onclick="viewBlogDetails(${index})" class="blogBut js-blog-but">View More <img src="Images/rightt arrow.svg" alt=""></button>
                    </div>
                `;
            });

            const blogsWrapper = document.querySelector('.js-blogs');
            if (blogsWrapper) {
                blogsWrapper.innerHTML = `<div class="card-wrapper swiper-wrapper">${landingBlogs}</div>`;

                if (allBlogs.length > 1) {
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
                            520: {
                                slidesPerView: 2,
                            },
                            920: {
                                slidesPerView: 3,
                            }
                        },
                    });
                }
            }
            blogButton = document.querySelectorAll('.js-blog-but');

            viewBlogDetails();

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

BlogDisplay();

const viewBlog = document.querySelector('.viewBlog');
const commentButton = document.querySelectorAll('.js-comment-but')

commentButton.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        viewBlog.style.display = 'flex';
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

function likingBlog(index) {
    let blogToLike = allBlogs[index];
    let likeButApp = document.querySelector(`.lik-but-${index}`).querySelector('.thumb');

    if (blogToLike.bLike === "unliked") {
        blogToLike.bNumOfLike += 1;
        blogToLike.bLike = "liked";
        likeButApp.src = "Images/Liked.svg";

    } else {
        blogToLike.bNumOfLike -= 1;
        blogToLike.bLike = "unliked";
        likeButApp.src = "Images/Lik.svg";
    }

    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
    document.querySelector(`.js-num-likes-${index}`).textContent = blogToLike.bNumOfLike;
}

function sendComment(event, index) {
    event.preventDefault();
    const blogCommentedOn = allBlogs[index];
    const commentWritten = document.querySelector('.js-write-comment').value;
    console.log(commentWritten);
    blogCommentedOn.bComments.unshift(commentWritten);
    console.log(blogCommentedOn.bComments);
    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));

    viewBlogDetails(index);
}

function viewBlogDetails(index) {
    index = index || 0;
    const blogToView = allBlogs[index];
    let commentsHTML = '';

    const dateString = blogToView.bDate;
     const dateObject = new Date(dateString);
      let formated = formatDate(dateObject);

    blogToView.bComments.forEach(comment => {
        commentsHTML += `
            <div class="oneCom">
                <div>${comment}</div>
                <button class="someButs"><img style="width: 70%;" src="Images/Like.svg" alt=""></button>
            </div>
        `;
    });

    const blogDetails = `
        <div class="blogLeft">
            <div class="topDesc">
                <img class="blImage" src="${blogToView.bImage}" alt="">
                <div class="bllDesc">
                    <div class="blTitle">${blogToView.bTitle}</div>
                    <div class="blDesc">${blogToView.bShortDesc}</div>
                    <div class="blDate">${formated }</div>
                    <div class="blIcon">
                        <button class="like-but js-like-but lik-but-${index}" onclick="likingBlog(${index})">
                            <div><img class="thumb" src="${blogToView.bLike === 'liked' ? 'Images/Liked.svg' : 'Images/Lik.svg'}" alt=""></div>
                        </button>
                        <div class="numOfLiks js-num-likes-${index}">${blogToView.bNumOfLike}</div>
                        <a href="#comments" class="menu-link"><button class="blComment"><img src="Images/Comment.svg" alt=""></button></a>
                    </div>
                </div>
            </div>
            <div class="botDesc">${blogToView.bLongDesc}</div>
        </div>
        <div class="topCancel">
            <button class="canelBut" onclick="cancleViewBlog()">x</button>
        </div>
        <div class="blogRight">
            <div id="comments-${index}" class="botComment">
                <div class="comHead">Comment Section</div>
                <div class="comments">
                    ${commentsHTML}
                </div>
                <form action="">
                    <div class="writer">
                        <input required type="text" class="write js-write-comment" placeholder="Add Comment ...">
                        <button class="someButs js-send-comment" onclick="sendComment(event, ${index})">
                            <img class="blSend" src="Images/Send.svg" alt="">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.querySelector('.js-view-blog-Detailed').innerHTML = blogDetails;

    if (blogButton) {
        blogButton.forEach(blogBut => {
            blogBut.addEventListener('click', function() {
                viewBlog.style.display = 'flex';
            });
        });
    }
}

function cancleViewBlog() {
    viewBlog.style.display = 'none';
}

document.querySelectorAll('.menu-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
    anchor.addEventListener('click', function(e) {
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
