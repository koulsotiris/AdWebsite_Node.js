document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded");
  
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
  
    console.log(categoryId);
  
    // Fetch subcategories based on the categoryId
    if (categoryId) {
      fetch(`https://wiki-ads.onrender.com/categories/${categoryId}/subcategories/`)
        .then(response => response.json())
        .then(data => {
          console.log("Data fetched:", data);
  
          // Compile Handlebars template for categories
          const sourceCategories = document.getElementById('categories-template').innerHTML;
          const templateCategories = Handlebars.compile(sourceCategories);
  
          // Attempt to select the container by id
          const containerCategories = document.getElementById('categories-container1');
          console.log("Container for Categories:", containerCategories);
  
          if (containerCategories) {
            // Render the template with the fetched data
            const renderedHtmlCategories = templateCategories({ categories: data });
            // Append the rendered HTML to the container
            containerCategories.innerHTML = renderedHtmlCategories;
            console.log("Categories Rendering completed");
          } else {
            console.error('Categories Container element not found.');
          }
        })
        .catch(error => console.error('Error fetching categories data:', error));
    }
  
    // Fetch ads based on the subcategory
    const adTemplate = document.getElementById('ad-template');
    if (!adTemplate) {
      console.error("Handlebars template element for Ads not found.");
      return;
    }
  
    if (categoryId) {
      const apiUrl = `https://wiki-ads.onrender.com/ads?category=${categoryId}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log("Data fetched for Ads:", data);
  
          // Compile Handlebars template for ads
          const sourceAds = adTemplate.innerHTML;
          const templateAds = Handlebars.compile(sourceAds);
          const htmlAds = templateAds({ ad: data });
  
          // Replace the content of the grid container with the rendered HTML
          document.querySelector('.grid-container').innerHTML = htmlAds;
  
          console.log("Ads Rendering completed");
        })
        .catch(error => console.error('Error fetching ads data:', error));
    } else {
      console.error('Category ID not found in the URL.');
    }


  // document.getElementById('favor_button').addEventListener('click', function(event) {
  //   // Prevent the default behavior of the link (preventing the page from navigating)
  //   event.preventDefault();

  //   // Your logic for adding to favorites here
  //   addToFavorites('ad_id', 'ad_title', 'ad_description', 'ad_cost', 'ad_image', 'username', 'sessionId');
  // });


  // function addToFavorites(id, title, description, cost, image, username, sessionId) {
  //   // Έλεγχος ταυτοποίησης χρήστη
  //   if (!sessionId) {
  //       alert("Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων");
  //       return;
  //   }
    
  //   // Έλεγχος αν η αγγελία είναι ήδη στα αγαπημένα
  //   if (isAdInFavorites(id)) {
  //       alert("Η αγγελία είναι ήδη στη λίστα αγαπημένων");
  //       return;
  //   }
  // }

  
    // Add a click event listener to the logout button
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Your logout logic here (e.g., clearing session data or making a logout API call)

        // Reload the page
        location.reload();
    });
  }); 

  