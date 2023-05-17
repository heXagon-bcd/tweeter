/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // const tweetData = [
  //     {
  //       "user": {
  //         "name": "Newton",
  //         "avatars": "https://i.imgur.com/73hZDYK.png"
  //         ,
  //         "handle": "@SirIsaac"
  //       },
  //       "content": {
  //         "text": "If I have seen further it is by standing on the shoulders of giants"
  //       },
  //       "created_at": 1461116232227
  //     },
  //     {
  //       "user": {
  //         "name": "Descartes",
  //         "avatars": "https://i.imgur.com/nlhLi3I.png",
  //         "handle": "@rd" },
  //       "content": {
  //         "text": "Je pense , donc je suis"
  //       },
  //       "created_at": 1461113959088
  //     }
  //   ]
  
  //   console.log(tweetData[0].user.name)
  
  const createTweetElement = function(db) {
    const date = new Date(db.created_at)
    // const now = new Date();
    // const dateDiff = Math.abs(now - date)
    // const dateDiffDays = Math.floor(dateDiff/(1000*60*60*24))
    // console.log("datediff", dateDiff)
    const dateDiffDays = timeago.format(date)
  
  
    const $tweeter = $(`      
    <div class="tweet-container">
    <div class="tweet-user">
      <div id="tweet-container-image"> <img id="tweet-image-2" src="${db.user.avatars}" alt="business-man"> ${db.user.name} </div>
      <div id="tweet-container-handle">${db.user.handle}</div>
    </div>
    <div id="tweet-container-txtcontainer">
    
      <textarea readonly name="text-txtcontainer" id="tweet-text" maxlength="140">${db.content.text}</textarea>
    </div>
    <div class="bottom-border"></div>
      <div id="tweet-container-footer">
          <div id="post-time"> ${dateDiffDays} Days Ago</div>    
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
  }
  
  const renderTweets = function(tweets) {
    // loops through tweets
    for(let key in tweets) {
    createTweetElement(tweets[key])
    }
  }
    
    // takes return value and appends it to the tweets container
  // }

  const loadTweets = function() {
    console.log("Loading tweeets...")
    $.ajax('/tweets', {method:'GET'})
      .then(function(moreData) {
        console.log('Success', moreData);
        renderTweets(moreData);
      });
    };

  
  //function to capture submit event
  
  $('#tweet-form').on("submit", function(event) {
    event.preventDefault();
    const text = $(this).serialize();
  
  //post request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: text,
      // success: success,
    });
    $.ajax('/tweets', {method:'GET'})
      .then(function(moreData) {
        console.log('Success', moreData);
        const latestTweet = moreData[moreData.length -1]; // Assuming the latest tweet is the first one
        createTweetElement(latestTweet);
      });
  });

renderTweets(() => {$.ajax('/tweets', {method:'GET'})})
$(document).ready(function() {
  loadTweets()
});
//ennd
});
