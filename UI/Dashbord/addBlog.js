document.getElementById("addBlogForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const blogImage = document.querySelector('.js-blog-image');
    const blogTitle = document.querySelector('.js-blog-title');
    const blogShortDesc = document.querySelector('.js-blog-shortDesc');
    const blogLongDesc = document.querySelector('.js-blog-longDesc');
    const blogAdded = document.querySelector('.messageSent');
    
    
    blogAdded.style.display = 'flex';
    setTimeout(() => {
        blogAdded.style.display = 'none';
        blogImage.value = "";
        blogTitle.value = "";
        blogShortDesc.value = "";
        blogLongDesc.value = "";
    }, 2000);
    
    
});