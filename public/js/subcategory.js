
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

});














// document.addEventListener('DOMContentLoaded', function () {
  
//     const homeRentalsData = [
//         {
//             title: 'Διαμέρισμα 65 τ.μ.',
//             price: '850 €',
//             image: 'RESOURCES/house1.jpg',
//             bedrooms: 2,
//             bathIcon: 'RESOURCES/bath.png',
//             bathrooms: 1,
//             yearBuiltIcon: 'RESOURCES/house.png',
//             yearBuilt: 2000,
//             location: 'Αθήνα (Μεταξουργείο)',
//             lastModified: 'Τελευταία τροποποίηση: 7 ημέρες πριν',
//             adCode: 11 ,
//             ref: 'home-rentals-details.html'
//         },{
//           title: 'Διαμέρισμα 70 τ.μ.',
//           price: '460 €',
//           image: 'RESOURCES/house2.webp',
//           bedrooms: 2,
//           bathIcon: 'RESOURCES/bath.png',
//           bathrooms: 1,
//           yearBuiltIcon: 'RESOURCES/house.png',
//           yearBuilt: 1972,
//           location: 'Αθήνα (Άγιος Παντελεήμονας)',
//           lastModified: 'Τελευταία τροποποίηση: 2 ημέρες πριν',
//           adCode: 12,
//       }, {
//           title: 'Διαμέρισμα 52 τ.μ.',
//           price: '550 €',
//           image: 'RESOURCES/house3.webp',
//           bedrooms: 1,
//           bathIcon: 'RESOURCES/bath.png',
//           bathrooms: 1,
//           yearBuiltIcon: 'RESOURCES/house.png',
//           yearBuilt: 1975,
//           location: 'Αθήνα (Νιρβάνα)',
//           lastModified: 'Τελευταία τροποποίηση: 6 ημέρες πριν',
//           adCode: 13
//     },{
//       title: 'Διαμέρισμα 25 τ.μ.',
//       price: '350 €',
//       image: 'RESOURCES/house4.jpg',
//       bedrooms: 1,
//       bathIcon: 'RESOURCES/bath.png',
//       bathrooms: 1,
//       yearBuiltIcon: 'RESOURCES/house.png',
//       yearBuilt: 1980,
//       location: 'Αθήνα (Κυψέλη)',
//       lastModified: 'Τελευταία τροποποίηση: 4 ημέρες πριν',
//       adCode: 14
//   }
//   ,{
//     title: 'Διαμέρισμα 65 τ.μ.',
//     price: '850 €',
//     image: 'RESOURCES/house5.webp',
//     bedrooms: 2,
//     bathIcon: 'RESOURCES/bath.png',
//     bathrooms: 2,
//     yearBuiltIcon: 'RESOURCES/house.png',
//     yearBuilt: 2021,
//     location: 'Αθήνα (Μεταξουργείο)',
//     lastModified: 'Τελευταία τροποποίηση: 10 ημέρες πριν',
//     adCode: 15
//   }
//   ];
  
//     const source = document.getElementById('home-rentals-template').innerHTML;
//     const template = Handlebars.compile(source);
//     const html = template({ homeRentals: homeRentalsData });
  
//     // Προσθέστε το δημιουργημένο HTML στο DOM
//     document.querySelector('.grid-container').innerHTML = html;
//   });