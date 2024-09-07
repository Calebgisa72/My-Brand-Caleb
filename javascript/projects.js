let displayNum = 3;

function initializeProj() {
  const moreProjectsBut = document.querySelector(".js-moreProjects");
  moreProjectsBut.addEventListener("click", () => {
    displayNum += 3;
    renderProjects();
  });
}

function viewProjectDetails(id) {
  const viewProjectDiv = document.querySelector(".js-projectDetails");
  const projectToView = projects.find((project) => project._id === id);
  if (!projectToView) return;
  viewProjectDiv.innerHTML = `<div class="singleProject">
<div class="modelTitle">
  <p class="singleProjTitle">${projectToView.pTitle}</p>
  <div class="cancleDiv">
    <button class="canelBut projCancle" onclick="cancleViewProject()">
      x
    </button>
  </div>
</div>
<div class="projectImage">
  <img
    class="projectImg"
    src="${projectToView.pImage}"
    alt=""
  />
</div>
<div class="projectDesciptions">
${
  projectToView.pLink
    ? `<div style="display: flex; gap: 10px; margin-top: -10px">
    Link:
    <a
      href="${projectToView.pLink}"
      style="display: flex; align-items: center"
      class="projectLink"
    >${projectToView.pLink}</a>
  </div>`
    : ""
}
    <div class="techDiv">
    <label style="min-width: 140px;">Technology stack:</label>
    <ul class="technilogyList">
        ${projectToView.pTechnologies
          .map((pTech) => `<li class="techItem">${pTech}</li>`)
          .join(" ")}
      </ul>
    </div>
    <p class="timeInt">Time interval: ${formatDate(
      projectToView.pStartDate
    )} - ${
    projectToView.pEndDate === "present"
      ? "Present"
      : formatDate(projectToView.pEndDate)
  }</p>
    <div class="projectLongDesc">${projectToView.pLongDesc}</div>
  </div>
</div>`;
  viewProjectDiv.style.display = "flex";
}

function cancleViewProject() {
  const viewProjectDiv = document.querySelector(".js-projectDetails");
  viewProjectDiv.innerHTML = "";
  viewProjectDiv.style.display = "none";
}

const renderProjects = () => {
  const projectDiv = document.querySelector(".js-projectsDiv");
  const moreProjectsBut = document.querySelector(".js-moreProjects");
  let projectsHmlprojects = ``;
  projects.slice(0, displayNum).forEach((project) => {
    projectsHmlprojects += `<div class="proj" onclick="viewProjectDetails('${project._id}')">
    <div class="projImage">
      <img
        class="projImg"
        src="${project.pImage}"
        alt=""
      />
    </div>
    <div class="projectHeadTitle"><div class="projTitle">${project.pTitle}</div><i class="fa-solid fa-arrow-right arrowButton"></i></div>
    <div class="projDesc">
      ${project.pShortDesc}
    </div>
  </div>`;
  });

  projectDiv.innerHTML = projectsHmlprojects;

  if (projects.length <= 3 || projects.length <= displayNum) {
    moreProjectsBut.style.display = "none";
  }
};
