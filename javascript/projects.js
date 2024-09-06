const projectDiv = document.querySelector(".js-projectsDiv");
const moreProjectsBut = document.querySelector(".js-moreProjects");
let displayNum = 3;
const renderProjects = () => {
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
    <div class="projTitle">${project.pTitle}</div>
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

moreProjectsBut.addEventListener("click", () => {
  displayNum += 3;
  renderProjects();
});

const viewProjectDiv = document.querySelector(".js-projectDetails");

function viewProjectDetails(id) {
  const projectToView = projects.find((project) => project._id === id);
  if (!projectToView) return;
  viewProjectDiv.innerHTML = `<div class="singleProject">
  <div class="modelTitle">
    <p class="singleProjTitle">${projectToView.pTitle}</p>
    <div class="cancleDiv">
      <button class="canelBut" onclick="cancleViewProject()">
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
    <ul class="technilogyList">
        <label>Technology stack:</label>
        ${projectToView.pTechnologies
          .map((pTech) => `<li>${pTech}</li>`)
          .join(" ")}
      </ul>
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
  viewProjectDiv.innerHTML = "";
  viewProjectDiv.style.display = "none";
}
