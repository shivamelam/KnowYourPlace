
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('so you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');
    
    //nytAPI

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' 
                                + cityStr +'&sort=newest&api-key=8fb426ee50082cb0939047120898d00c:1:73320243';
    
    $.getJSON(nytimesUrl, function( data ) {
        $nytHeaderElem.text('Newyork times article about ' + cityStr);
        articles=data.response.docs;
        for(var i=0;i<articles.length;i++)
        {
            var article=articles[i];
        $nytElem.append('<li class="article"><a href="'+article.web_url + '">'
                                + article.headline.main +'</a>' + '<p>' + article.snippet + '<p>' + '</li>');
         };

    }) .error(function(e) {
        $nytHeaderElem.text("NY Times couldnt be loaded");
         });




    var wikiUrl='https://en.wikipedia.org/w/api.php?action=opensearch&search='+ cityStr+'&format=json&callback=wikiCallback';
    $.ajax({url:wikiUrl, dataType:"jsonp",success:function(response){
                var articleList=response[1];
                for(var i=0;i<articleList.length;i++){
                    articleStr=articleList[i];
                    var url='https://en.wikipedia.org/wiki' + articleStr;
                    $wikiElem.append('<li><a href="' +url+'">'+articleStr+'</a></li>');

                }


        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
