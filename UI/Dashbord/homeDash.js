let totalBlogs = 0;
let totalLikes = 0;
let totalComments = 0

const totalB = localStorage.getItem('totalBlogs');
    document.getElementById('numOfBlogs').innerHTML = totalB;

    const totalM = localStorage.getItem('totalMessages');
    document.getElementById('numOfMess').innerHTML = totalM;

    let numLikeDiv = document.getElementById('numOfLikes');
    let numcoms = document.getElementById('numOfcoms');

    async function updates() {
        try {
            showLoader();
            const response = await fetch("https://my-brand-backend-iyxk.onrender.com/api/blogs", {
                method: "GET",
            });
            const data = await response.json();
            hideLoader();
            let allBlogs = data;
    
            let totalBlogs = allBlogs.length;
            localStorage.setItem('totalBlogs', totalBlogs);
    
            let totalLikes = 0;
            allBlogs.forEach((blog) => {
                totalLikes += blog.bNumOfLike;
                blog.bComments.forEach((Comment )=>{
                    totalComments += 1;
                })

            });

    
            if (numLikeDiv) {
                numLikeDiv.innerHTML = totalLikes;
            }

            if (numcoms) {
                numcoms.innerHTML = totalComments;
            }
    
        } catch (error) {
        }
    }


updates();


        