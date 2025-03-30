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
            const favourites = [favouriteAds];
            console.log('Favourite Ads:', favourites[0]);

            favouriteAdsContainer.innerHTML = renderFavouriteAdsTemplate(favourites[0]);
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
