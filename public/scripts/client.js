/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const createTweetElement = function (db) {
    const date = new Date(db.created_at);
    const dateDiffDays = timeago.format(date);
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
          <div id="post-time"> ${dateDiffDays}</div>    
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
  </div>`);
    $(".prepend").prepend($tweeter);
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    for (let key in tweets) {
      createTweetElement(tweets[key]);
    }
  };

  // takes return value and appends it to the tweets container

  const loadTweets = function () {
    console.log("Loading tweeets...");
    $.ajax("/tweets", { method: "GET" }).then(function (moreData) {
      console.log("Success", moreData);
      renderTweets(moreData);
    });
  };

  //function to capture submit event

  $("#tweet-form").on("submit", function (event) {
    $("#error-container").empty();
    const $error = $(`
      <div style="border: 5px solid red; margin-bottom: 30px; color: red; " class="error-popup">You are at or have exceeded your character limit! Please rewrite your message</div>
    `);
    const $error2 = $(`
      <div style="border: 5px solid red; margin-bottom: 30px; color: red; " class="error-popup">You cant submit an empty tweet.  Please write a message!</div>
    `);
    event.preventDefault();
    const text = $(this).serialize();
    console.log(this);
    if (text.length >= 145) {
      $("#error-container").append($error);
    } else if (text.length === 5) {
      $("#error-container").append($error2);
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: text,
        success: function () {
          $.ajax("/tweets", { method: "GET" }).then(function (moreData) {
            console.log("Success", moreData);
            const latestTweet = moreData[moreData.length - 1];
            createTweetElement(latestTweet);
          });
        },
      });
    }
  });

  //load tweets wtihout needing to press intial submit
  renderTweets(() => {
    $.ajax("/tweets", { method: "GET" });
  });
  $(document).ready(function () {
    loadTweets();
  });

//end
});
