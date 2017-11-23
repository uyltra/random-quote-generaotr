$(document).ready(function(){
  $('#getQuote').on('click', function(event) {
    event.preventDefault();

    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(data) {
      $(".card-body").append(data[0].content + "<p>— " + data[0].title + "</p>")
    });
  });
})
