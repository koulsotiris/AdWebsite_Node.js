document.addEventListener('DOMContentLoaded', function () {
    const storedUsername = localStorage.getItem('username');
    const storedSessionId = localStorage.getItem('sessionId');
  
    console.log("user is " + storedUsername);
    console.log("storedSessionId " + storedSessionId);
  
    if (storedUsername && storedSessionId) {
      const usernameDisplay = document.getElementById('username-display');
      const userBox = document.getElementById('user');
      const favButton = document.getElementById('favourites_button');
      const logoutButton = document.getElementById('logoutButton');
  
      if (usernameDisplay) usernameDisplay.textContent = storedUsername;
      if (userBox) userBox.style.display = 'block';
      if (favButton) {
        favButton.style.display = 'inline-block';
        favButton.href = `favourite-ads.html?username=${storedUsername}&sessionid=${storedSessionId}`;
      }
      if (logoutButton) logoutButton.style.display = 'block';
    }
  
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('username');
        localStorage.removeItem('sessionId');
        location.reload();
      });
    }
  });
  