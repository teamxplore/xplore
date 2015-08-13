angular.module('uberxplore.locations', [])

.factory('Locations', function() {
  var locations = [];

  // Test data
  // locations.push({
  //   name: "Hack Reactor",
  //   address: "944 Market Street #8, San Francisco, CA 94102",
  //   // We could possibly use API + star rating to generate the correct stars for the service
  //   api: "Yelp",
  //   stars: 5
  // });

  // locations.push({
  //   "name":"Pont de l'Archevêché",
  //   "imgUrl":"http://s3-media2.fl.yelpcdn.com/bphoto/KNWaCtbZDO3Lrwpokecbcg/o.jpg",
  //   "address":["Pont de l'Archevêché","Notre Dame De Paris","75005 Paris","France"],
  //   "description":"There are many love lock bridges in Paris, this particular one is behind Notre Dame. If you take a walk down the side of the cathedral between the gardens...",
  //   "distance":4242.867083598702,
  //   "reviews":11,
  //   "ratingUrl":"http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"
  // });

  // locations.push({
  //   "name":"Musée d'Orsay",
  //   "imgUrl":"http://s3-media4.fl.yelpcdn.com/bphoto/hspN-UxcF7fddgKR285F0Q/o.jpg",
  //   "address":["62 rue de Lille","Musée d'Orsay","75343 Paris","France"],
  //   "description":"This museum was fantastic!  My husband and I enjoyed this place so much.  There were so many well known pieces and the layout of the museum was inviting....",
  //   "distance":696.2506333799638,
  //   "reviews":552,
  //   "ratingUrl":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png"
  // });

  // locations.push({
  //   "name":"Sainte-Chapelle",
  //   "imgUrl":"http://s3-media3.fl.yelpcdn.com/bphoto/u_0xpRbLl4l2BTHhqxuFWg/o.jpg",
  //   "address":["4 bd du Palais","1er","75001 Paris","France"],
  //   "description":"Ahh I love this place! The inside is SO beautiful. The stained glass makes the experience so unforgettable. It's 8.50 Euro to get in, but ask for the...",
  //   "distance":3774.0945367277036,
  //   "reviews":152,
  //   "ratingUrl":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png"
  // });
  // Exporting this locations will make it consistent across all parts of the app
  return locations
})