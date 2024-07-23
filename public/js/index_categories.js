document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM Content Loaded");
  
  // Fetch data from the provided URL
  fetch('https://wiki-ads.onrender.com/categories/')
      .then(response => response.json())
      .then(data => {
          console.log("Data fetched:", data);
          // Compile Handlebars template
          const source = document.getElementById('categories-template').innerHTML;
          const template = Handlebars.compile(source);

          // Attempt to select the container by id
          const container = document.getElementById('categories-container1');
          console.log("Container:", container);

          if (container) {
              // Render the template with the fetched data
              const renderedHtml = template({ categories: data });
              // Append the rendered HTML to the container
              container.innerHTML = renderedHtml;
              console.log("Rendering completed");
          } else {
              console.error('Container element not found.');
          }
      })
      .catch(error => console.error('Error fetching data:', error));
});

