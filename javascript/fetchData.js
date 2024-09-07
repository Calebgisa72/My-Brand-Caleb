let blogs = [];
let profile = null;
let projects = [];
let skills = [];

const portfolioDiv = document.querySelector(".js-portfolioData");

async function callSubFunctions() {
  try {
    await Promise.all([
      fetchBlogs(),
      fetchProfile(),
      fetchProjects(),
      fetchSkills(),
    ]);
    portfolioDiv.innerHTML = "";
    portfolioDiv.innerHTML = portfolioHtml;
    initializeProj();
    initializeSkills();
    renderProjects();
    renderProfile();
    renderSkills();
    blogActivites();
    initializeMessage();
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

async function fetchBlogs() {
  try {
    const response = await fetch(
      `https://my-brand-backend-iyxk.onrender.com/api/blogs`
    );
    const data = await response.json();
    blogs = data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
}

async function fetchProfile() {
  try {
    const response = await fetch(
      `https://my-brand-backend-iyxk.onrender.com/api/profile`
    );
    const data = await response.json();
    profile = data.profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
}

async function fetchProjects() {
  try {
    const response = await fetch(
      `https://my-brand-backend-iyxk.onrender.com/api/project`
    );
    const data = await response.json();
    projects = data.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
}

async function fetchSkills() {
  try {
    const response = await fetch(
      `https://my-brand-backend-iyxk.onrender.com/api/skills`
    );
    const data = await response.json();
    skills = data;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
}

callSubFunctions();

function initializeToast() {}
