var caption = '';
var captionLength = 0;
var NOUN, prevNOUN;
var words = ['programmer', 'student', 'web developer',
               'coder', 'software engineer', 'computer scientist',
               'problem solver', 'hard worker', 'team player'];

function blinkCursor() {
  $('#cursor').animate({
    opacity: 0}, 'fast', 'swing').delay(200).animate({
      opacity: 1}, 'fast' , 'swing');
}

function deleteNoun(){
  caption = NOUN.text();
  prevNOUN = NOUN.text();
  captionLength = caption.length;
  erase();
}

function erase(){
  NOUN.text(caption.substr(0, captionLength--));
  if (captionLength >= 0){
    setTimeout(erase, 150);
  }
  else{
    captionLength = 0;
    caption = '';
    setTimeout(addNoun, 100);
  }
}

function addNoun(){
  var rand; 
  do { //so same word ins't generated twice in a row
    rand = Math.floor((Math.random() * 100) % 9);
  }while(words[rand] == prevNOUN);
  caption = words[rand] + '.';
  add();
}

function add(){
  NOUN.text(caption.substr(0, captionLength++));

  if (captionLength <= caption.length){
    setTimeout(add, 150);
  }
  else{
    caption = '';
    captionLength = 0;
    setTimeout(deleteNoun, 1500);
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
var eeCount = 2;


var main = function(){
  setInterval(blinkCursor, 1000);
  NOUN = $('#noun');
  setTimeout(deleteNoun, 250);
  
  $('.collapsible').collapsible();
  $('.materialboxed').materialbox();

  $("#profile-pict").click(function(){
    clickCount++;
    if (clickCount == eeCount){
      playSound();
      clickCount = 0;
    }
  });
  
  $(".brand-logo").click(function(){
    $("html, body").animate({ scrollTop: $("#sound").offset().top - $(".navbar-fixed").height()}, 500);
  });
  $(".nav-about").click(function(){
    $("html, body").animate({ scrollTop: $("#about").offset().top - $(".navbar-fixed").height()}, 500);
  });
  $(".nav-project").on("click",function(){
    $("html, body").animate({ scrollTop: $("#projects").offset().top - $(".navbar-fixed").height()}, 500);
  });
  $(".nav-resume").on("click",function(){
    $("html, body").animate({ scrollTop: $("#resume").offset().top -$(".navbar-fixed").height()}, 500);
  });
  
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
