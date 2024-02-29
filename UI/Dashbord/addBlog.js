document.getElementById("addBlogForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const blogImageInput = document.querySelector('.js-blog-img');
    const blogTitle = document.querySelector('.js-blog-title').value;
    const blogShortDesc = document.querySelector('.js-blog-shortDesc').value;
    const blogLongDesc = document.querySelector('.js-blog-longDesc').value;
    const blogAdded = document.querySelector('.messageSent');


    if (blogImageInput.files.length > 0) {
        const blogImageFile = blogImageInput.files[0];

        const reader = new FileReader();

        reader.onload = function(e) {

            const blogImageBase = e.target.result;
            
            let aNewBlog = {
                bImage: blogImageBase,
                bTitle: blogTitle,
                bShortDesc: blogShortDesc,
                bLongDesc: blogLongDesc,
            };

            allBlogs.push(aNewBlog);
            localStorage.setItem('allTheBlogs', JSON.stringify(allBlogs));

            blogAdded.style.display = 'flex';
            setTimeout(() => {
                blogAdded.style.display = 'none';
            }, 2000);

            blogImageInput.value = "";
            document.querySelector('.js-blog-title').value = "";
            document.querySelector('.js-blog-shortDesc').value = "";
            document.querySelector('.js-blog-longDesc').value = "";
            
            updateBlogDisplay();
        };
        reader.readAsDataURL(blogImageFile);
    } else {
        alert("Please select an image.");
    }
});
