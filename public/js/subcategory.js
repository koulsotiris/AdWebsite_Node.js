
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Content Loaded");

    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    console.log(categoryId);

    if (!categoryId) {
        console.error('Category ID not found in the URL.');
        return; // Exit the function if categoryId is not available
    }

    const adTemplate = document.getElementById('ad-template');

    if (!adTemplate) {
        console.error("Handlebars template element not found.");
        return;
    }

    const apiUrl = `https://wiki-ads.onrender.com/ads?subcategory=${categoryId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Data fetched:", data);

            const source = adTemplate.innerHTML;
            const template = Handlebars.compile(source);
            const html = template({ ad: data });

            document.querySelector('.grid-container').innerHTML = html;

            console.log("Rendering completed");
        })
        .catch(error => console.error('Error fetching data:', error));

        // Register the split helper
        Handlebars.registerHelper('split', function (input, delimiter) {
            return input.split(delimiter);
        });

        const slideState = {};

        function showSlide(adId, index) {
          const slides = document.querySelectorAll(`.slide-${adId}`);
          if (!slides.length) return;
          slideState[adId] = index;
      
          slides.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
          });
        }


        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('next-btn') || e.target.classList.contains('prev-btn')) {
              const adId = e.target.getAttribute('data-id');
              const slides = document.querySelectorAll(`.slide-${adId}`);
              if (!slides.length) return;
        
              let current = slideState[adId] ?? 0;
              current += e.target.classList.contains('next-btn') ? 1 : -1;
              if (current < 0) current = slides.length - 1;
              if (current >= slides.length) current = 0;
        
              showSlide(adId, current);
            }
          });
        
          // Init all slides after rendering
          setTimeout(() => {
            const allAds = document.querySelectorAll('.slideshow-container');
            allAds.forEach(container => {
              const adId = container.getAttribute('data-ad-id');
              slideState[adId] = 0;
              showSlide(adId, 0);
            });
          }, 200); // Allow time for DOM update
        });















