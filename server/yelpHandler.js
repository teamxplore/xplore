var yelp = require("yelp").createClient({
  consumer_key: "TsnPAO-_aWxaIOg9pINODA", 
  consumer_secret: "lIppVhaecKJLupkZ1hoj_iXp70E",
  token: "hxSCofJo7YX-qO8vtoZadSit0dJgKJSc",
  token_secret: "b5-VDa5hgiuph2LUT6JtyojOmIk"
});

module.exports = {

  explore: function(params, callback) {
    yelp.search(params, function(err, data) {
      if (err) { console.log(err); }
      else { callback(data); }
    });
  },

};