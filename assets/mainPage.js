var caption = '';
var captionLength = 0;
var NOUN;

var mn = $(".main-nav");
var scroll2far = 0;

function blinkCursor() {
  $('#cursor').animate({
    opacity: 0}, 'fast', 'swing').delay(200).animate({
      opacity: 1}, 'fast' , 'swing');
}

function deleteNoun(){
  caption = NOUN.text();
  captionLength = caption.length;
  erase();
}

function erase(){
  NOUN.text(caption.substr(0, captionLength--));

  if (captionLength >= 0){
    setTimeout('erase()', 150);
  }
  else{
    captionLength = 0;
    caption = '';
    setTimeout('addNoun()', 100);
  }
}

function addNoun(){
  var words = ['programmer',
               'student',
               'web designer',
               'coder',
               'software engineer',
               'computer scientist',
               'problem solver',
               'hard worker',
               'team player'];
  var rand = Math.floor((Math.random() * 100) % 9);
  caption = words[rand];
  add();
}

function add(){
  NOUN.text(caption.substr(0, captionLength++));

  if (captionLength <= caption.length){
    setTimeout('add()', 150);
  }
  else{
    caption = '';
    captionLength = 0;
    setTimeout('deleteNoun()', 2500);
  }
}

var clickTimer;

function playSound(){
  clearTimeout(clickTimer);
  $(".thuglife").css("visibility", "visible");
  $("#sound").html(
    "<audio autoplay='autoplay'>" +
    "<source src='assets/EasterEggs/audio.mp3' type='audio/mpeg'>" +
    "<embed hidden='true' autostart='true' loop='false' src='assets/EasterEggs/audio.mp3'>" +
    "</audio>"
    );
  spinGlasses();
  clickTimer = setTimeout(function(){
    $(".thuglife").css({"visibility" : "hidden"})
  }, 10500);
}

var deg = 0;
function spinGlasses(){
  deg += 1440;
  var str = "rotate(" + deg + "deg)";

  $(".thuglife").css({
    "-webkit-transform" : str,
    "-moz-transform" : str,
    "-ms-transform" : str,
    "transform" : str
  });


}




var clickCount = 0;
var eeCount = 8;

var text = $("#resume").position().top;


var main = function(){
  setInterval(blinkCursor, 1000);
  NOUN = $('#noun');
  setTimeout('deleteNoun()', 2500);
  
  $('.scrollspy').scrollSpy();
  $('.collapsible').collapsible({
      accordion : false
    });
  $('.materialboxed').materialbox();

  $("#profile-pict").click(function(){
    clickCount++;
    if (clickCount == eeCount){
      playSound();
      clickCount = 0;
    }
  });

  
  $(".resizer").click(function(){
    setTimeout(function(){
      text = $("#resume").position().top;}, 300);
  });
  
  if($(window).scrollTop() > text - 200){
    $(".nav-projects").removeClass("active");
  }
};


$(window).scroll(function(){
  var cur = $(this).scrollTop();
  var about = $(".jumbotron").height();
  var proj = about + $("#about").height();
  var res = proj + $("#projects").height() - 200;
  
  //improved materialize scrollspy
  if(cur < about){
     $(".nav-about").removeClass("active-new");
  }
  else if(cur > about && cur < proj){
    $(".nav-about").addClass("active-new");
    $(".nav-project").removeClass("active-new");
  }
  else if(cur > proj && cur < res){
    $(".nav-about").removeClass("active-new");
    $(".nav-resume").removeClass("active-new");
    $(".nav-project").addClass("active-new");
  }
  else if(cur > res){
    $(".nav-project").removeClass("active-new");
    $(".nav-resume").addClass("active-new");
  }
});

$(document).ready(main);























