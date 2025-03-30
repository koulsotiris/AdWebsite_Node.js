document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-favourites-btn')) {
      event.preventDefault();

      // Extract data from the clicked element
      // Get the parent div of the clicked button (the ad container)
      var adContainer = event.target.closest(".ad");

      // Extract data from the ad container
      var adId = adContainer.querySelector(".ad-code").textContent.trim().replace("Κωδικός Αγγελίας: ", "");
      var adTitle = adContainer.querySelector(".title h2").textContent.trim();
      var adDescription = adContainer.querySelector("p").textContent.trim();
      var adCostText = adContainer.querySelector(".title h3").textContent.trim();
      var adCost = parseInt(adCostText.replace("Κοστος : ", "").replace(" ευρώ", ""));
      var adImage = adContainer.querySelector("img").getAttribute("src");
      const username = document.getElementById('UserName');
      const sessionId = document.getElementById('sessionid');

        console.log("adId:", adId);
        console.log("adTitle:", adTitle);
        console.log("adDescription:", adDescription);
        console.log("adCost:", adCost);
        console.log("adImage:", adImage);
        console.log("username:", username.innerHTML.trim());
        console.log("sessionId:", sessionId.innerHTML.trim());

      if (username.innerHTML.trim() != "") {

      // Make a POST request to the server
      fetch('http://localhost:3000/add-to-favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adId,
          adTitle,
          adDescription,
          adCost,
          adImage,
          username: username.innerHTML.trim(),
          sessionId: sessionId.innerHTML.trim(),
        }),
      })
      .then(response => {
        if (response.ok) {
          alert('Ad added to favourites!');
          console.log(response);
        } else {
          alert('This ad is already in the favourites');
        }
      })
      .catch(error => {
        console.error('Error communicating with the web service:', error);
        alert('An error occurred while communicating with the web service.');
      });
    }
    else {alert('You have to sign in first in order to save favourites')};
    }
  });