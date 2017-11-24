$(document).ready(function(){

  var $card = $('.card-body');
  var count = 0;
  var successShowm = false;


  $('#getQuote').on('click', function(event) {
    count++;
   event.preventDefault();

    $('#quotes').css({
      'display':'block'
    });

    $.ajax({
    type: 'GET',
    url: '//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
    crossDomain: true,
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function(data) {
      if (!successShowm) {
        $('#postsuccess').addClass('show');
        $('#postsuccess p').html('It Worked! :-)');
        successShowm = true;
      }

      if (count == 1) {
            $card.html(data[0].content + '<p class="quote-text">— ' + data[0].title + "</p>");
      } else if (count > 1 ) {
        $card.html('');
        $card.html(data[0].content + '<p class="quote-text">— ' + data[0].title + "</p>");
      }

        var arr = data[0].content;
        var corrected = arr.replace(/(<p>|<\/p>)/g,'');
      $('a#tweetBtn').attr({
        href: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(corrected)
      });
    },
    error: function(jqXHR, exception) {
      var msg = '';

      if (jqXHR === 0) {
       msg = ' Not connected \n Verify Network.';
      } else if (jqXHR === 404) {
        msg = 'Page not found [404]';
      } else if (jqXHR === 500) {
        msg = ' Internal Server Error';
      } else if (exception === 'parsererror' ) {
        msg = 'Requested JSON parse failed';
      } else if (exception === 'timeout') {
        msg = 'Timeout error';
      } else if(exception === 'abort') {
        msg = 'Ajax aborted';
      } else {
        msg = ' Unknown error ' + jqXHR.responseText;
      };
      $('#posterror').addClass('show');
      $('#posterror p').html(msg);
    }
  });

  });
})
