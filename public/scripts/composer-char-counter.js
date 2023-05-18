$(document).ready(function () {
  const charCounter = function () {
    const charCount = $("#tweet-text").val().length;
    if (charCount < 141) {
      $("#counter").text(charCount);
    } else {
      $("#counter")
        .text(140 - charCount)
        .css("color", "red");
    }
  };

  $("#tweet-text").on("input", charCounter);
});
