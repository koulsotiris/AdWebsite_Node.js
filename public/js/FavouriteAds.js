document.addEventListener('DOMContentLoaded', function () {
    // Fetch username and sessionId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const sessionId = urlParams.get('sessionid');

    console.log('Username:', username);
    console.log('Session ID:', sessionId);

    var h2Element = document.getElementById("FAV");
    h2Element.textContent = "Αγαπημένες αγγελίες του χρήστη "+username;

    // Make a request to the server to get favourite ads for the user
    fetch(`http://localhost:3000/get-favourite-ads?username=${username}&sessionId=${sessionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch favourite ads. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(favouriteAds => {
            // Render favourite ads using Handlebars template
            const favouriteAdsContainer = document.getElementById('favouriteAdsContainer');

            // const favouriteAdsArray = JSON.parse(favouriteAds);
            console.log('Favourite Ads:', favouriteAds);

            favouriteAdsContainer.innerHTML = renderFavouriteAdsTemplate(favouriteAds);
        })
        .catch(error => {
            console.error('Error fetching favourite ads:', error.message);
        });

});

function renderFavouriteAdsTemplate(favourite) {
    const source = document.getElementById('favouriteAds-template').innerHTML;
    const template = Handlebars.compile(source);
    return template({ favouriteAds: favourite });
}


// Make a request to the server to delete an ad from favourites when the button is pressed
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-favourites-btn')) {
      const adContainer = event.target.closest(".ad");
      const adId = adContainer.querySelector(".ad-code").textContent.trim().replace("Κωδικός Αγγελίας: ", "");
  
      const username = localStorage.getItem("username");
      const sessionId = localStorage.getItem("sessionId");
  
      fetch('http://localhost:3000/remove-from-favourites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adId, username, sessionId })
      })
        .then(response => {
          if (response.ok) {
            alert('Η αγγελία αφαιρέθηκε από τα αγαπημένα.');
            adContainer.remove(); // Remove from the DOM
          } else {
            alert('Αποτυχία κατά την αφαίρεση.');
          }
        })
        .catch(error => {
          console.error('Error deleting favourite:', error);
          alert('Σφάλμα διακομιστή κατά την αφαίρεση.');
        });
    }
  });
