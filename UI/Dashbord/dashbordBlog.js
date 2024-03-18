let allBlogs = JSON.parse(localStorage.getItem('allTheBlogs')) || [];

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
 

  function updateBlogDisplay(){

    let blogs = '';
    
  allBlogs.forEach((blog,index) =>{
    blogs += `<div class="oneBlog">
    <div class="imgDiv">
        <img class="blogImage" src="${blog.bImage}">
        <div class="blogDate blDate">${blog.bDate}</div>
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
                <img class="thumbs" src="../Images/Comment.svg" alt=""></button>
            </div>
    </div>
  </div>`
  
  });

  document.querySelector('.js-all-blogs').innerHTML = `<div class="allBlogs">
                ${blogs}
        </div>`;

        attachEditButtonListeners();

  }

  updateBlogDisplay();
  
  function seeComments(index){
    let blogSeeComments = allBlogs[index];
    let allComs = '';
    blogComms = blogSeeComments.bComments;
    console.log(blogComms);
    blogComms.forEach((comment, commentIndex) => {
      allComs += `<div class="oneComment">
      <div class="comWord">${comment}</div>
      <button class="delComBut js-del-com" onclick="deleteComment(${index}, ${commentIndex})">

          <img class="delImg" src="dImage/Bin.svg" alt="">
      </button>
  </div>`

    })

    document.querySelector('.coms').innerHTML= `${allComs}`
  }

  function deleteComment(blogIndex, commentIndex) {
    let blogToUpdate = allBlogs[blogIndex];
    
    blogToUpdate.bComments.splice(commentIndex, 1);
    
    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
    seeComments(blogIndex);
}

  
  function deleteBlog(index) {
    allBlogs.splice(index, 1);
    updateBlogDisplay();
    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
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

        blogToEdit.bTitle = editBlogTitleInput.value;
        blogToEdit.bShortDesc = editBlogShortDescInput.value;
        blogToEdit.bLongDesc = editBlogLongDescInput.value;
  
        if (editBlogImageInput.files.length > 0) {
            const newBlogImageFile = editBlogImageInput.files[0];
            const reader = new FileReader();
  
            reader.onload = function(e) {

                blogToEdit.bImage = e.target.result;
  
                updateBlogDisplay();
  
                editBlogs.style.display = 'none';
                rightElement.style.filter = 'grayscale(0%)';
                leftElement.style.filter = 'grayscale(0%)';

                localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
            };
  
            reader.readAsDataURL(newBlogImageFile);
        } else {

            updateBlogDisplay();

            editBlogs.style.display = 'none';
            rightElement.style.filter = 'grayscale(0%)';
            leftElement.style.filter = 'grayscale(0%)';

            localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
        }
    };
  }

  const viewCommentButton = document.querySelectorAll('.js-comment-but');

  const adminCommentView = document.querySelector('.commentView');
  viewCommentButton.forEach(viewCom =>{
    viewCom.addEventListener('click', ()=>{
      adminCommentView.style.display = 'flex'
    })
  })
  function cancleBlogComment(){
    adminCommentView.style.display = 'none'
  }

  const deleteCommentButton = document.querySelectorAll('.js-del-com');

  deleteCommentButton.forEach(delComBut =>{
    delComBut.addEventListener('click', ()=>{

    })
  })

