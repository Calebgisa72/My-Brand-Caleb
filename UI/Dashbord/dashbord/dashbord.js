const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileLayer = document.getElementById("mobile-layer");
const closeBtn = document.getElementById("closeBtn");

let showMobileBar = false;

hamburgerBtn.addEventListener("click", () => {
    handleViewMobileBar();
  });
  
  closeBtn.addEventListener("click", () => {
    handleViewMobileBar();
  });
  
  const handleViewMobileBar = () => {
    showMobileBar = !showMobileBar;
    if (showMobileBar) {
      mobileLayer.style.display = "flex";
      requestAnimationFrame(() => {
        mobileLayer.classList.add("open");
      });
    } else {
      mobileLayer.classList.remove("open");
      setTimeout(() => {
        mobileLayer.style.display = "none";
      }, 300);
    }
  };


  document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  const routes = {
    '/dashboard/home': 'dashboardHome.html',
    '/dashboard/profile': 'dashboardProfile.html',
    '/dashboard/messages': 'dashboardMessages.html',
    '/dashboard/portfolio': 'dashboardPortfolio.html',
    '/dashboard/skills': 'dashboardSkills.html',
    '/dashboard/blog': '../dashboardBlog.html',
  };

  const loadContent = async (url) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      app.innerHTML = content;

      const scripts = app.querySelectorAll('script');
      scripts.forEach((script) => {
        console.log(script);
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript).parentNode.removeChild(newScript);
      });
    } catch (error) {
      app.innerHTML = '<h1>404 Not Found</h1>';
    }
  };

  const parseRoute = () => {
    const hash = window.location.hash.slice(1);
    return routes[hash] || null;
  };

  const loadRoute = () => {
    const url = parseRoute();
    if (url) {
      loadContent(url);
    } else {
      app.innerHTML = '<h1>404 Not Found</h1>';
    }
  };

  window.addEventListener('hashchange', loadRoute);
  loadRoute(); // Load the initial route
});
