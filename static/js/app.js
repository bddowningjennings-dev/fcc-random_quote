(() => {
  const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';
  const colors = ['#ff3233', '#67ddd8','#3cb44b','#ffe119','#fabebe','#e6beff','#aaffc3', '#ff3233', '#67ddd8','#3cb44b','#ffe119','#fabebe','#e6beff','#aaffc3'];
  let app = {};

  app.getQuote = () => {
    let rnd = Math.floor(Math.random() * colors.length);
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: (data) => {
        $('.quote').fadeOut(100, function() {
          $('.quote').html('');
          $('.quote').append('<br> <p>', data.quoteText, '</p>');
          if (data.quoteAuthor === "") {
            $('.quote').append('<br> <p> - ' + "unknown" + '</p>');
          } else {
            $('.quote').append('<br> <p> - ' + data.quoteAuthor + '</p>');
          }
        });
        $('.quote').fadeIn(100, function() {});      
        let tweet = '<a target="_blank" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent('"'+data.quoteText+'" - ' + data.quoteAuthor + ' #quote') + '">Twitter</a>';
        $('.tweet').html(tweet);
        $('body').css({ backgroundColor: colors[rnd]});
        for (child of $('.buttons').children()) {
          $(child).css({ backgroundColor: colors[rnd]});
        }
      },
      error: (err) => console.log(err)
    });
  }
  $('.new-quote').click((e) => {
    app.getQuote();
  })

  app.getQuote();
})()