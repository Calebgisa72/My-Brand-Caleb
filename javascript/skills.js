const skillsDiv = document.querySelector(".js-skillsDiv");
const moreskillsBut = document.querySelector(".js-moreSkills");
let skillsDisplayNum = 5;
const renderSkills = () => {
  let skillsHTML = ``;
  skills.slice(0, skillsDisplayNum).forEach((skill) => {
    skillsHTML += `<div
            class="skillCard"
            style="background: ${skill.color}"
          >
            <img class="skillIcon" src="${skill.icon}" />
            <div class="cardDetails">
              <div class="smallDetails">
                <div class="Htime">${timeAgo(skill.learntDate)}</div>
                <span>&#183;</span>
                <div class="skillLevel">Proficiency: ${skill.proficiency}</div>
              </div>
              <div class="skillTitle">${skill.title}</div>
              <div class="skillDesc">${skill.shortDescription}</div>
            </div>
            <div class="certification">${skill.relatedLibraries}</div>
          </div>`;
  });

  skillsDiv.innerHTML = skillsHTML;

  if (skills.length <= 5 || skills.length === skillsDisplayNum) {
    moreskillsBut.style.display = "none";
  }
};

moreskillsBut.addEventListener("click", () => {
  skillsDisplayNum = skills.length;
  renderSkills();
});
