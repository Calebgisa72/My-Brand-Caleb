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

  cancleBut.addEventListener('click', function() {
    editBlogs.style.display = 'none';
    rightElement.style.filter = 'grayscale(0%)';
    leftElement.style.filter = 'grayscale(0%)';
  });

  function updateBlogDisplay(){

    let blogs = '';
    
  allBlogs.forEach((blog,index) =>{
    console.log(blog.bTitle);
    blogs += `<div class="oneBlog">
    <div class="imgDiv" style="display: inline-block;">
        <img class="blogImage" src="${blog.bImage}">
    </div>
    <div class="details">
        <div class="titl">${blog.bTitle}</div>
        <div class="desc">${blog.bShortDesc}</div>
    </div>
    <div class="buttons">
        <button class="editBut edit-button" onclick="editBlog(${index})">Edit</button>
        <button class="deleteBut" onclick="deleteBlog(${index})">Delete</button>
    </div>
  </div>`
  });

  document.querySelector('.js-all-blogs').innerHTML = `<div class="allBlogs">
                ${blogs}
        </div>`;

        attachEditButtonListeners();

  }

  updateBlogDisplay();

  function deleteBlog(index) {
    allBlogs.splice(index, 1);
    updateBlogDisplay();
    localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));
  }

  function editBlog(index) {
    let blogToEdit = allBlogs[index];
    
    const editBlogImage = document.querySelector('.js-edit-image');
    const editBlogTitle = document.querySelector('.js-edit-title');
    const editBlogShortDesc = document.querySelector('.js-edit-shortDesc');
    const editBlogLongDesc = document.querySelector('.js-edit-longDesc');

    editBlogImage.src = blogToEdit.bImage;
    editBlogTitle.value = blogToEdit.bTitle;
    editBlogShortDesc.value = blogToEdit.bShortDesc;
    editBlogLongDesc.value = blogToEdit.bLongDesc;

  }

