personality = null;
chatHistory = [];

$(document).ready(function () {
  $.get("/personality", function (data, status) {
    data = JSON.parse(data);
    personality = data[0];
    $("#persona").html(data[1].split(".").join("<br>"));
  });

  $(".input-button").click(function (e) {
    e.preventDefault();
    if (!$(".loading")[0]) {
      input_txt = $(".input-message").val();
      $(".input-message").val("");
      console.log("input: " + input_txt);
      $(".messages").append(
        '<div class="message outgoing"><div class="message-inner">' +
          input_txt +
          "</div></div>"
      );
      $(".messages").animate(
        { scrollTop: $(".messages").prop("scrollHeight") },
        500
      );
      if (chatHistory.length == 0) {
        console.log("Chat is empty clear text");
        $(".inner").html("");
      }
      info = {
        raw_text: input_txt,
        personality: JSON.stringify(personality),
        chatHistory: JSON.stringify(chatHistory),
      };
      //console.log(info);
      $(".messages").append(
        '<div class="message incoming waitmessage"><div class="message-inner loading" id="wait">thinking </div></div>'
      );
      $(".messages").animate(
        { scrollTop: $(".messages").prop("scrollHeight") },
        500
      );
      $.get("/chat2", info, function (data, status) {
        data = JSON.parse(data);
        console.log(data);
        $("#message").html('<div class="message-inner">' + data[0] + "</div>");
        $(".waitmessage").replaceWith(
          '<div class="message incoming"><div class="message-inner">' +
            data[0].replace("<", "[").replace(">", "]") +
            "</div></div>"
        );
        chatHistory = data[1];
      });
    }
  });

  $(".input-message").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      $(".input-button").trigger("click");
    }
  });

  $(".js-shuffle").click(function (e) {
    if (!$(".loading")[0]) {
        chatHistory = [];
        $(".messages").html("");
        messageCount = 0;
        $(".inner").html("Start chatting with this model.");
        $.get("/personality", function (data, status) {
        data = JSON.parse(data);
        personality = data[0];
        $("#persona").html(data[1].split(".").join("<br>"));
        });
    }
  });
});
