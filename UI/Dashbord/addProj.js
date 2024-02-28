document.getElementById("addProjForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const projImage = document.querySelector('.js-proj-image');
    const projTitle = document.querySelector('.js-proj-title');
    const projShortDesc = document.querySelector('.js-proj-shortDesc');
    const techUsed = document.querySelector('.js-proj-tech')
    const projLongDesc = document.querySelector('.js-proj-longDesc');
    const projAdded = document.querySelector('.messageSent');
    
    
    projAdded.style.display = 'flex';
    setTimeout(() => {
        projAdded.style.display = 'none';
        projImage.value = "";
        projTitle.value = "";
        projShortDesc.value = "";
        techUsed.value = "";
        projLongDesc.value = "";
    }, 2000);
    
    
});