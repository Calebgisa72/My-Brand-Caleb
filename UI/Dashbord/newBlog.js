let totalBlogs = 0;
for(let i=0; i<allBlogs.length; i++){
  totalBlogs +=1;
}
document.querySelector('.js-all-blog').innerHTML=`<div>Total Blogs : ${totalBlogs}</div>`

console.log("check");