

function controller() {
  var users = ["twitch", "OgamingSC2", "cretetion", "vainglory", "food", "habathcx", "noobs2ninjas", "freecodecamp", "thejwittz","bobross","riotgames", "brunofin"];
     
  for (var i = 0; i < users.length; i++) {
    
    var user = users[i];
    
    $.when(
      $.ajax({
         type:"GET",
          dataType: "jsonp",
          data: {
              client_id: "j15r3tcqv1ies1opd4ve46kq74106un",
              format: "json"
          },
          url:"https://api.twitch.tv/kraken/channels/"+user+"?",
          success: function(data) { 
              return data;
          },
      }).done(function() {console.log('SUCCESS channel call returned :)'); })
        .fail(function() { console.log('FAIL channel call :('); })
        .always(function() { console.log('channel call attempted'); }),
      
      $.ajax({
        type:"GET",
        dataType: "jsonp",
        data: {
          client_id: "j15r3tcqv1ies1opd4ve46kq74106un",
          format: "json"
        },
        url:"https://api.twitch.tv/kraken/streams/"+user+"?",
        success: function(data) {
            return data;
      
      
        //end stream success
        },
   //end stream ajax     
      }).done(function() {console.log('SUCCESS stream call :)'); })
        .fail(function() { console.log('FAIL stream call :('); })
        .always(function() { console.log('stream call attempted'); })
    
    //end when()
    ).done(function(data1, data2){
      
      var chan = data1[0];
      var stream = data2[0];
      
      //from channel call
      var name = chan.display_name;
      var status = chan.status;
      var game = chan.game;
      var imgLogo = chan.logo;
      var imgBan = chan.profile_banner;
      var url = chan.url;
      var msg = chan.message;
      
      //from stream call
      if (stream.stream !== null && status !== 404) {
      var preview_large = stream.stream.preview.large;
      var viewCount = stream.stream.viewers;
        
      }
      
      if (imgBan === null) {
        imgBan = chan.video_banner;
      }
      
      if (imgBan === null || imgBan === undefined) {
        imgBan = "http://cdn0.dailydot.com/originals/twitch-pattern.png";
      }
      
      if (imgLogo === null || imgLogo === undefined) {
        imgLogo = "http://2am.ninja/twitch/img/unknown.png";
      }
      
     if (status !== 404 && status !== 422 && status !== null && stream.stream !== null) {
  
      $('.content').append('<div class="status-wrap" data-name="live"> <a href="'+url+'" target="_blank"> <div class="status"> <i aria-hidden="true" class="fa fa-play-circle-o play"></i> <img src="'+imgBan+'" class="status-bg"> <img src="'+imgLogo+'" class="status-logo"> <span class="status-name">'+name+'</span> <div class="status-stream"> <img src="'+preview_large+'"> <span class="stream-cap">'+status+' - '+game+'<br><i class="fa fa-eye" aria-hidden="true"></i><span class="view"> '+viewCount+'</span></span> </div><div class="status-live"> <span>Live Now!</span> <i aria-hidden="true" class="fa fa-twitch active"></i> </div></div></a></div>');
        
       
      //end if statement
      }
      
      else if (status === null || stream.stream === null) {
  
      $('.content').append('<div class="status-wrap offline" data-name="offline"> <a href="'+url+'" target="_blank"> <div class="status"><img src="'+imgBan+'" class="status-bg"> <img src="'+imgLogo+'" class="status-logo"> <span class="status-name">'+name+'</span> </div><div class="status-offline"> <span>Offline</span> <i aria-hidden="true" class="fa fa-twitch"></i> </div></a></div>');
       
      //end if statement
      }
      
      else if (status === 404) {
        
        $('.content').append('<div class="status-wrap offline" data-name="zexist"> <a href="https://www.twitch.tv" target="_blank"> <div class="status"><img src="'+imgBan+'" class="status-bg"> <img src="'+imgLogo+'" class="status-logo"> <span class="status-name">'+msg.slice(7,-1)+'t</span> </div><div class="status-offline"> <span>Offline</span> <i aria-hidden="true" class="fa fa-twitch"></i> </div></a></div>');
      }
      
       var $content = $('.content'),
          $status = $content.children('div');
      
      $status.sort(function(a,b){
        var an = a.getAttribute('data-name'),
            bn = b.getAttribute('data-name');

        if(an > bn) {
          return 1;
        }
        if(an < bn) {
          return -1;
        }
      return 0;
      });

      $status.detach().appendTo($content);
      
    //end when done()  
    }).fail(function(){
      console.log("Sorry, your chain is busted!");
    //end fail()  
    });    
  //end for loop
  } 
      
//end controller() 
}


$(document).ready(function() {
  controller();
  counter();
    
//end $document.ready
      
});

$('.refresh').click(function() {
  $('.content').html('');
  $('.onCount').text('Online ...');
  $('.offCount').text('Offline ...');
  controller();
  counter();
})

function counter() {
  setTimeout(function() {
     $(document).ready(function() {
      var $content = $('.content').children('div');
         
      var onCount = 0, offCount = 0;
       for (var i = 0; i < $content.length; i++) {
         if ($content[i].getAttribute("data-name") == "live") {
           onCount++;
         }
         
         else {
           offCount++;
         }
       }
    $('.onCount').text('Online ');
    $('.offCount').text('Offline ');
    $('.onCount').append(onCount);
    $('.offCount').append(offCount);
    
     })}, 1800); 
  
}

function LivePulse() {

  setTimeout(function() {
    $('.active').toggleClass("animated pulse");
    LivePulse();
  },700);
};

LivePulse();