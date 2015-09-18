(function($){
  'use strict';
  $(document).ready(initialize);

  var photos, costumes, i;
  var counter = 0;

  function initialize(){
    var $container = $('#container');
    $container.isotope({
      itemSelector : '.ite',
      layoutMode   : 'masonry',
      masonry      : {
        gutter     : 10
      },
      getSortData  : {
        likes      : '.likes'
      }
    });
    didLoad($container);
    query();
    setInterval(query, 5000);
  }

  function didLoad(dom){
    $('.instagram').on('didLoadInstagram', function(event, response) {
      console.log(response);
      sortByHash(response)
      rank(dom);
    });
  }

  function sortByHash(response){
    costumes = [];
    for (i = 0; i < 33; i++){
      if (response.data[i].tags[0] == "cc" || response.data[i].tags[0] == "nomstreet14"){
        costumes.push(response.data[i]);
      }
    };
    console.log(costumes);
    costumes.sort(sortByLikes);
  }

  function sortByLikes(a, b){
    var aCount = a.likes.count;
    var bCount = b.likes.count;
    return ((bCount < aCount) ? -1 : ((bCount > aCount) ? 1 : 0));
  }

  function rank(dom){
    var $items = dom.find('.ite');
    $items.each( function( i, item ) {
      var $item = $(item);
      var photoUrl = costumes[i].images.standard_resolution.url;
      var caption = costumes[i].caption.text;
      if (caption.indexOf("@") != -1){
        var cap = caption.split("@");
        var tion = cap[1].split(" ", 1);
        $item.find('.username').text( '@' + tion[0] );
      }
      $item.find('.likes').text( costumes[i].likes.count );
      $item.addClass('rank' + i);
      var element = document.getElementById('info' + (i + 1));
      element.style.backgroundImage = 'url(' + photoUrl + ')';
    });
    dom.isotope('updateSortData', $items);
    dom.isotope({ sortBy: 'likes', sortAscending: false });
  }

  function query(){
    $('.instagram').instagram({
      userId      : 492006858,
      count       : 33,
      accessToken : '234553568.467ede5.bae2604e97df4b3ba61e37a6c41e2245',
      clientId    : 'bf7acb5d25b841a7ae168fc0fea11208'
    });
  }

})(jQuery);
