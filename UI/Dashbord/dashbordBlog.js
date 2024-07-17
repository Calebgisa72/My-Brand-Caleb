let allBlogs;
let totalBlogs = 0;

function showLoader(){
  loader.style.display = "flex";
}

function hideLoader(){
  loader.style.display = "none";
}

  const editBlogs = document.querySelector('.editBlog');
  const rightElement = document.querySelector('.rightSide');
  const leftElement = document.querySelector('.leftSide');
  const cancleBut = document.querySelector('.canelBut');

  function attachEditButtonListeners() {
  const editBlogButtons = document.querySelectorAll('.edit-button');

  editBlogButtons.forEach(editBlogButton => {
      editBlogButton.addEventListener('click', function() {
          editBlogs.style.display = 'flex';
          rightElement.style.filter = 'grayscale(100%)';
          leftElement.style.filter = 'grayscale(100%)';
      });
  });
  }
  
  function cancleViewBlog(){
    editBlogs.style.display = 'none';
    rightElement.style.filter = 'grayscale(0%)';
    leftElement.style.filter = 'grayscale(0%)';
}
 
function formatDate(date) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
}

async function updateBlogDisplay() {
  try {
      showLoader();
      const response = await fetch("https://my-brand-backend-iyxk.onrender.com/api/blogs", {
          method: "GET",
      });
      const data = await response.json();
      hideLoader();
      allBlogs = data;

      
    for(let i=0; i<allBlogs.length; i++){
     totalBlogs +=1;
    }

      let blogs = '';
      allBlogs.forEach((blog, index) => {

        const dateString = blog.bDate;
        const dateObject = new Date(dateString);
        let formated = formatDate(dateObject);


          blogs += `<div class="oneBlog">
              <div class="imgDiv">
                  <img class="blogImage" src="${blog.bImage}">
                  <div class="blogDate blDate">${formated}</div>
              </div>
              <div class="details">
                  <div class="titl">${blog.bTitle}</div>
                  <div class="desc">${blog.bShortDesc}</div>
              </div>
              <div class="buttons">
                  <button class="editBut edit-button" onclick="editBlog(${index})">Edit</button>
                  <button class="deleteBut" onclick="deleteBlog(${index})">Delete</button>
                  <div class="feedBlogs">
                      <div class="like-but js-like-but"><img class="thumb" src="../Images/Like.svg" alt=""></div>
                      <div class="numOfLiks">${blog.bNumOfLike}</div>
                      <button class="like-but js-comment-but" onclick="seeComments(${index})">
                          <img class="thumbs" src="../Images/Comment.svg" alt="">
                      </button>
                  </div>
              </div>
          </div>`;
      });

      document.querySelector('.js-all-blogs').innerHTML = `<div class="allBlogs">${blogs}</div>`;
      attachEditButtonListeners();

  } catch (error) {
      console.log('Error:', error);
  }
}

updateBlogDisplay();


  function seeComments(index){
    let blogSeeComments = allBlogs[index];
    let allComs = '';
    blogComms = blogSeeComments.bComments;
    blogComms.forEach((comment, commentIndex) => {
      allComs += `<div class="oneComment">
      <div class="commentData">
        <div class="comSender">${comment.sender}</div>
        <div class="comWord">${comment.comment}</div>
       </div>
      <button class="delComBut js-del-com" onclick="deleteComment(${index}, ${commentIndex})">

          <img class="delImg" src="dImage/Bin.svg" alt="">
      </button>
  </div>`

    })
    document.querySelector('.coms').innerHTML= `${allComs}`

    adminCommentView.style.display = 'flex'

  }

  function deleteComment(blogIndex, commentIndex) {
    let blogToUpdate = allBlogs[blogIndex];
    
    blogToUpdate.bComments.splice(commentIndex, 1);
    
    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
    seeComments(blogIndex);
}

  
  function deleteBlog(index) {
    let blogToDelete = allBlogs[index];
    let id = blogToDelete._id;
    const token = localStorage.getItem("token");

    showLoader();
    fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(async(res)=>{
      const data = await res.json();
      hideLoader();
      console.log(data.message);
      if(data.message === "Blog deleted successfully"){
        alert("Blog Have Been Deleted");
      }
    updateBlogDisplay();
    })
    .catch(error => {
      console.error('Error:', error);
  });
  }

  function editBlog(index) {
    let blogToEdit = allBlogs[index];
    
    const editBlogImageInput = document.querySelector('.js-edit-image');
    const editBlogTitleInput = document.querySelector('.js-edit-title');
    const editBlogShortDescInput = document.querySelector('.js-edit-shortDesc');
    const editBlogLongDescInput = document.querySelector('.js-edit-longDesc');
    const saveEditsButton = document.querySelector('.js-save-edits');
  
    editBlogTitleInput.value = blogToEdit.bTitle;
    editBlogShortDescInput.value = blogToEdit.bShortDesc;
    editBlogLongDescInput.value = blogToEdit.bLongDesc;
  
    saveEditsButton.onclick = function() {
        const token = localStorage.getItem("token");

            const updatedBlogData = {
                bTitle: editBlogTitleInput.value,
                bShortDesc: editBlogShortDescInput.value,
                bLongDesc: editBlogLongDescInput.value,
            };
  
            if (editBlogImageInput.files.length > 0) {
                const newBlogImageFile = editBlogImageInput.files[0];
                const reader = new FileReader();
  
                reader.onload = function(e) {
                    const blogImageBase = e.target.result;
  
                    updatedBlogData.bImage = blogImageBase;
                    
                    showLoader();
                    fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogToEdit._id}`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify(updatedBlogData)
                        }).then(async (res) => {
                          const data = await res.json();
                          hideLoader();
                          console.log(data);

                          updateBlogDisplay();
                          editBlogs.style.display = 'none';
                          rightElement.style.filter = 'grayscale(0%)';
                          leftElement.style.filter = 'grayscale(0%)';
                        })
                        .catch(error => {
                          console.error('Error:', error);
                      });
                           
                        
                };
                reader.readAsDataURL(newBlogImageFile);
            } 
            else {
              showLoader()
                    fetch(`https://my-brand-backend-iyxk.onrender.com/api/blogs/${blogToEdit._id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedBlogData)
                    }).then(async(res)=>{
                        const data = await res.json();
                        hideLoader();
                        updateBlogDisplay();
                        editBlogs.style.display = 'none';
                        rightElement.style.filter = 'grayscale(0%)';
                        leftElement.style.filter = 'grayscale(0%)';
                    })
                    .catch(error => {
                      console.error('Error:', error);
                  });
                      
                  }
                        
            }
        } 
    



  const viewCommentButton = document.querySelectorAll('.js-comment-but');

  const adminCommentView = document.querySelector('.commentView');
  viewCommentButton.forEach(viewCom =>{
    viewCom.addEventListener('click', ()=>{
      
    })
  })
  function cancleBlogComment(){
    adminCommentView.style.display = 'none'
  }

 