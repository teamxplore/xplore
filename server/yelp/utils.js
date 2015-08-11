var url = require('url');
var path = require('path');

module.exports = {

  // takes in small /ms.jpg path and changes to url of original size at /o.jpg
  getLargeImg: function(address) {
    var oldUrl = url.parse(address);
    var oldPath = path.parse(oldUrl.pathname);
    // set new base in oldPath to be o.jpg
    oldPath.base = 'o.jpg';
    // set new path in oldUrl
    oldUrl.pathname = path.format(oldPath);
    // return new url
    return url.format(oldUrl);
  },

  // this callback takes a single Yelp business's JSON data and parses out what we want
  makeExploreEntry: function(listing) {
    return {
      name: listing.name,
      imgUrl: this.getLargeImg(listing.image_url),
      address: listing.location.display_address, // this is an array where each element is an address line
      description: listing.snippet_text,
      distance: listing.distance,
      reviews: listing.review_count,
      ratingUrl: listing.rating_img_url
    };
  }
};