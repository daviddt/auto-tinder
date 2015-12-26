var tinder = require('tinderjs');
var client = new tinder.TinderClient();
var recommendations = [];
var counts = {};
var occuranceBeforeLike = 3;
var loopCount = 10;

/*
  Get your facebook token here
  https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token
  
  WARNNG - DON'T SHARE THIS TOKEN
*/

/*
  Get your facebook ID here
  http://findmyfbid.com/
*/

// CHANGE THIS TO YOUR OWN
var FACEBOOK_TOKEN = "ENTER YOUR TOKEN";
var FACEBOOK_ID = "ENTER YOUR ID";

client.authorize(
  FACEBOOK_TOKEN,
  FACEBOOK_ID,
  function(err, res) {
    var j = 0;
    for (var i = 0; i < loopCount; i++) {
      client.getRecommendations(10, function(error, data){
        if (data && data.results) recommendations = recommendations.concat(data.results);
        j++;
        if (j === loopCount) autoLike();
      });
    }
});

function autoLike () {
  for (var k = 0; k< recommendations.length; k++) {
      var num = recommendations[k]._id;
      counts[num] = counts[num] ? counts[num] + 1 : 1; 
  }
  
  var peopleWhoMightLikeYou = [];
  for (var key in counts) {
    if (counts[key] >= occuranceBeforeLike) {
      peopleWhoMightLikeYou.push(key);
    };
  };
  
  if (peopleWhoMightLikeYou.length) {
    peopleWhoMightLikeYou.forEach(function(likeId) {
      (function(id){
        client.like(id, function(data){
          console.log('Found someone who probably liked you ' + id);
        });
      })(likeId)
    });
  } else {
    console.log('I couldn\'t find anyone who probably liked you');
  }
}

