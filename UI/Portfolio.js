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

        let landingBlogs = ``;
        allBlogs.forEach((aBlog, index) => {

            const dateString = aBlog.bDate;
            const dateObject = new Date(dateString);
            let formatted = formatDate(dateObject);

            landingBlogs += `
                <div class="swiper-slide">
                    <div class="blogImage"><img class="blogImg" src="${aBlog.bImage}" alt=""></div>
                    <div class="blogDate">${formatted}</div>
                    <div class="bloggTitle">${aBlog.bTitle}</div>
                    <div class="blogDesc">${aBlog.bShortDesc}</div>
                    <div class="blogFeedback">
                        <button class="like-but js-like-but lik-but-${index}" onclick="handleLikeButtonClick(${index}, '${aBlog._id}')">
                            <div><img class="thumb" src="${isBlogLiked(aBlog._id) ? 'Images/Liked.svg' : 'Images/Lik.svg'}" alt=""></div>
                        </button>
                        <div class="numOfLiks js-num-likes-${index}">${aBlog.bNumOfLike}</div>
                        <button class="like-but js-comment-button" onclick="viewAndScroll(${index})"><img class="thumbs" src="Images/Comment.svg" alt=""></button>
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

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function isBlogLiked(blogId) {
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
    return likedBlogs.includes(blogId);
}

// Function to toggle like/dislike status
async function toggleLike(index, blogId) {
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
    const likeButton = document.querySelector(`.lik-but-${index}`);
    const thumbImage = likeButton.querySelector('.thumb');

    if (isBlogLiked(blogId)) {
        try {
            showLoader();
            const response = await fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogId}/disLike`, {
                method: 'POST',
            });
            const data = await response.json();
            hideLoader();
        } catch (error) {
            console.error('Error:', error);
        }

        const updatedLikes = parseInt(likeButton.nextElementSibling.textContent) - 1;
        likeButton.nextElementSibling.textContent = updatedLikes;
        thumbImage.src = 'Images/Lik.svg';
        // Remove blogId from likedBlogs
        const updatedLikedBlogs = likedBlogs.filter(id => id !== blogId);
        localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs));
    } else {
        // Like blog
        try {
            showLoader();
            const response = await fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogId}/like`, {
                method: 'POST',
                // Add headers and body if required
            });
            const data = await response.json();
            hideLoader();
        } catch (error) {
            console.error('Error:', error);
        }

        const updatedLikes = parseInt(likeButton.nextElementSibling.textContent) + 1;
        likeButton.nextElementSibling.textContent = updatedLikes;
        thumbImage.src = 'Images/Liked.svg';
        // Add blogId to likedBlogs
        likedBlogs.push(blogId);
        localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
    }
}

// Function to handle like button click
async function handleLikeButtonClick(index, blogId) {
    await toggleLike(index, blogId);
}

BlogDisplay();

const viewBlog = document.querySelector('.viewBlog');

async function sendComment(event, index) {
    event.preventDefault();
    const blogCommentedOn = allBlogs[index];
    let id = blogCommentedOn._id;
    const commentWritten = document.querySelector('.js-write-comment').value;
    const nameWritten = document.querySelector('.js-write-name').value;

    if (commentWritten.trim() !== "" && nameWritten.trim() !== "") {
        try {
            let newComment = {
                sender: nameWritten,
                comment: commentWritten
            }
            showLoader();
            const response = await fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newComment)
            });

            const data = await response.json();
            hideLoader();

            if (data.message === "Comment added successfully") {
                showToast("Comment added", "success");
                document.querySelector('.js-write-comment').value = "";
                document.querySelector('.js-write-name').value = "";
                viewBlogDetails(index);
            }
        } catch (error) {
            console.error('Error:', error);
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

function viewBlogDetails(index) {
    index = index || 0;
    const blogToView = allBlogs[index];
    let id = blogToView._id;
    let commentsHTML = '';
    
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
        console.log(allComments);
        allComments.forEach(comment => {
            console.log(comment);
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
        <div class="blogLeft">
            <div class="topDesc">
                <img class="blImage" src="${blogToView.bImage}" alt="">
                <div class="bllDesc">
                    <div class="blTitle">${blogToView.bTitle}</div>
                    <div class="blDesc">${blogToView.bShortDesc}</div>
                    <div class="blDate">${formatted}</div>
                    <div class="blIcon">
                        <button class="like-but js-like-but lik-but-${index}" onclick="handleLikeButtonClick(${index}, '${blogToView._id}')">
                            <div><img class="thumb" src="${isBlogLiked(blogToView._id) ? 'Images/Liked.svg' : 'Images/Lik.svg'}" alt=""></div>
                        </button>
                        <div class="numOfLiks js-num-likes-${index}">${blogToView.bNumOfLike}</div>
                        <button class="like-but js-comment-button" onclick="scrollToComments(${index})"><img class="com-but" src="Images/Comment.svg" alt=""></button>
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
                        <input required type="text" name="comment" class="write js-write-comment" placeholder="Add Comment ...">
                        <input required type="text" name="sender" class="write-name js-write-name" placeholder="Your Name" >
                        <button class="someButs js-send-comment" onclick="sendComment(event, ${index})">
                            <img class="blSend" src="Images/Send.svg" alt="">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.querySelector('.js-view-blog-Detailed').innerHTML = blogDetails;
    viewBlog.style.display = 'flex';

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

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function viewAndScroll(index){
    viewBlogDetails(index)
    scrollToComments(index)
}

function scrollToComments(index) {
    const commentsSection = document.getElementById(`comments-${index}`);
    if (commentsSection) {
        commentsSection.scrollIntoView({
            behavior: 'smooth'
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

