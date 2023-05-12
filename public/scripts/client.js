/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  console.log(tweetData[0].user.name)

const createTweetElement = function(db) {
  const date = new Date(db.created_at)
  const now = new Date();
  const dateDiff = Math.abs(now - date)
  const dateDIffDays = Math.floor(dateDiff/(1000*60*60*24))
  console.log(dateDIffDays)


  const $tweeter = $(`      
  <div class="tweet-container">
  <div class="tweet-user">
    <div id="tweet-container-image"> <img id="tweet-image-2" src="${db[key].user.avatars}" alt="business-man"> ${db[key].user.name} </div>
    <div id="tweet-container-handle">${db[key].user.handle}</div>
  </div>
  <div id="tweet-container-txtcontainer">
  
    <textarea name="text-txtcontainer" id="tweet-text" maxlength="140">${db[key].content.text}</textarea>
  </div>
  <div class="bottom-border"></div>
    <div id="tweet-container-footer">
        <div id="post-time"> ${dateDIffDays} Days Ago</div>    
          <div class="icons">
            <div class ="subicon">
              <i class="fa-solid fa-flag fa-2xs"></i>
            </div>
            <div class ="subicon">
              <i class="fa-solid fa-retweet fa-2xs"></i>
            </div>
            <div class ="subicon">
              <i class="fa-solid fa-heart fa-2xs"></i>
            </div>
          </div>
        </div>
    </div> 
  </div>     
</div>`
);
$('.container').append($tweeter);
console.log(JSON.stringify(db[key].user.avatars, null, 2));
}

const renderTweets = function(tweets) {
  // loops through tweets
  for(key in tweets) {
  createTweetElement(tweetData)
  }
  
  // takes return value and appends it to the tweets container
}
renderTweets(tweetData);
// const $tweet = createTweetElement(tweetData);

});