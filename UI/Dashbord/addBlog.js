document
  .getElementById("addBlogForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      const blogImageInput = document.querySelector(".js-blog-img");
      const blogTitle = document.querySelector(".js-blog-title").value;
      const blogShortDesc = document.querySelector(".js-blog-shortDesc").value;
      const blogLongDesc = document.querySelector(".js-blog-longDesc").value;
      const blogAdded = document.querySelector(".messageSent");

      if (blogImageInput.files.length > 0) {
        const blogImageFile = blogImageInput.files[0];
        const reader = new FileReader();

        reader.onload = async function (e) {
          const formData = new FormData();

          formData.append("bTitle", blogTitle);
          formData.append("bShortDesc", blogShortDesc);
          formData.append("bLongDesc", blogLongDesc);
          formData.append("bImage", blogImageInput.files[0]);

          const token = localStorage.getItem("token");

          try {
            showLoader();
            const response = await fetch(
              "https://my-brand-backend-iyxk.onrender.com/api/blogs",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              }
            );
            const data = await response.json();
            hideLoader();

            if (data.message === "Created blog Successfully") {
              blogAdded.style.display = "flex";
              setTimeout(() => {
                blogAdded.style.display = "none";
              }, 2000);

              blogImageInput.value = "";
              document.querySelector(".js-blog-title").value = "";
              document.querySelector(".js-blog-shortDesc").value = "";
              document.querySelector(".js-blog-longDesc").value = "";

              setTimeout(() => {
                window.location.href = "dashbordBlog.html";
              }, 3000);
            }

            updateBlogDisplay();
          } catch (error) {
            console.error("Error:", error);
          }
        };
        reader.readAsDataURL(blogImageFile);
      } else {
        alert("Please select an image.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
