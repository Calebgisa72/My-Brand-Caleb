let allMess;

let loader = document.querySelector('.loaderContainer');

function showLoader(){
  loader.style.display = "flex";
}

function hideLoader(){
  loader.style.display = "none";
}

function formatDate(date) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();
    return `${day} ${month} ${year}`;
  }

async function updateMessageDisplay() {
    try {
        const token = localStorage.getItem("token");
        showLoader();
        const response = await fetch("https://my-brand-backend-iyxk.onrender.com/api/message", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        allMess = data;
        hideLoader();
        let allMessages = '';

        allMess.forEach((message, index) => {
          const dateString = message.dateSent;
          const dateObject = new Date(dateString);
          let formated = formatDate(dateObject);
  
            allMessages += `<div class="message">
            <div class="fDetails">
                <div class="name">${message.sName}</div>
                <div class="telNum">${message.sLocation}</div>
            </div>
            
            <div class="sDetails">
                <div class="email">${message.sEmail}</div>
                <div class="mText">${message.message}</div>
            </div>
            
            <div class="leff">
            <div class="messDate">${formated}</div>
            <button class="imgDelete" onclick="deleteBlog(${index})">
                <img class="delImage" src="dImage/Bin.svg" alt="">
            </button>
            </div>
            
            </div>`
        });

        document.querySelector('.js-all-messages').innerHTML = `<div class="messages">${allMessages}</div>`;
        
  
    } catch (error) {
        console.error('Error:', error);
    }
  }
  
  updateMessageDisplay();

  function deleteBlog(index) {
    let messageToDelete = allMess[index];
    let id = messageToDelete._id;
    const token = localStorage.getItem("token");

    showLoader();
    fetch(`https://my-brand-backend-iyxk.onrender.com/api/message/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(async(res)=>{
      const data = await res.json();
      hideLoader();
      if(data.message === "Message deleted successfully"){
        alert("Message Have Been Deleted");
      }
      updateMessageDisplay();
    })
    .catch(error => {
      console.error('Error:', error);
  });
  }