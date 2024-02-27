const editBlogs = document.querySelector('.editBlog');
const rightElement = document.querySelector('.rightSide');
const leftElement = document.querySelector('.leftSide');
const editBlogButton = document.querySelector('.editBut');
const cancleBut = document.querySelector('.canelBut');

editBlogButton.addEventListener('click', function() {
    editBlogs.style.display = 'flex';
    rightElement.style.filter = 'grayscale(100%)';
    leftElement.style.filter = 'grayscale(100%)';
  });

  cancleBut.addEventListener('click', function() {
    editBlogs.style.display = 'none';
    rightElement.style.filter = 'grayscale(0%)';
    leftElement.style.filter = 'grayscale(0%)';
  });