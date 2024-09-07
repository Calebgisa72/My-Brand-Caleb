const renderProfile = () => {
  const salutationDiv = document.querySelector(".js-salutation");
  const myNameDiv = document.querySelector(".js-myName");
  const myDescriptionDiv = document.querySelector(".js-myDescription");
  const profileImgDiv = document.querySelector(".js-profileImgDiv");
  const aboutTextDiv = document.querySelector(".js-aboutText");
  const courseDiv = document.querySelector(".js-course");
  const experienceDiv = document.querySelector(".js-experience");
  const aboutHeadingDiv = document.querySelector(".js-aboutHeading");

  salutationDiv.innerHTML = profile.welcomeText;
  myNameDiv.innerHTML = profile.name;
  myDescriptionDiv.innerHTML = profile.frontDescription;
  profileImgDiv.innerHTML = `<img class="profileImg" src="${profile.profileImage}" alt="" />`;
  aboutTextDiv.innerHTML = profile.aboutDescription
  courseDiv.innerHTML = profile.currentCourse
  experienceDiv.innerHTML = profile.experience
  aboutHeadingDiv.innerHTML = profile.aboutTitle
};
