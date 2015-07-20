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

var main = function(){
  setInterval(blinkCursor, 1000);
  NOUN = $('#noun');
  setTimeout('deleteNoun()', 2500);
  
  $('.scrollspy').scrollSpy();
  $('.collapsible').collapsible({
      accordion : false
    });
  $('.materialboxed').materialbox();
};

$(document).ready(main);