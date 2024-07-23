// Create a global array to store login data
// const loginDataArray = [];

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      alert('Login successful!');

      // Save the session ID (data.sessionId) for future requests
      const sessionValue = data.sessionId;

      // Store login data in the array
      // const loginInfo = { username, sessionId: sessionValue };
      // loginDataArray.push(loginInfo);

      // console.log(loginDataArray);

      let logout = document.getElementById('logoutButton');
      logout.style.display = 'block';

      let form = document.getElementById('loginForm');
      form.style.display = 'none';

      let usernameSpan = document.getElementById('UserName');
      usernameSpan.innerHTML += username;
      user.style.display = 'block';

      let sessionSpan = document.getElementById('sessionid');
      sessionSpan.innerHTML += sessionValue;
      session.style.display = 'block';

      let fav = document.getElementById('favourites_button');
      fav.style.display = 'inline-block';
      fav.href = "favourite-ads.html?username=" + username + "&sessionid=" + sessionValue;

    } else {
      // Login failed
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

// module.exports = { loginDataArray };
