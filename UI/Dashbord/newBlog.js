let allBlogs = JSON.parse(localStorage.getItem('allTheBlogs'));
if (allBlogs === null) {
  allBlogs = [];
}
