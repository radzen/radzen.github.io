var app = angular.module("app",[]);

app.controller("test", function($scope, $timeout){
  $scope.abilities = ["Fast Learner","Curious","Eye for Design"];
  $scope.likes = ["Flat UI","Responsive Design","Fluid Animations"];
  $scope.skills = ["HTML5","CSS3","Javascript", "jQuery","Angular.js","CSS Frameworks","MongoDB","Python"];
  $scope.projects = [
  {
    title: "Random Quote",
    description: ["A random quote generator.","Everyone starts somewhere and this is where it began for me, my very first web app. It was built with Bootstrap but I decided to switch to Semantic UI."],
    skills: [{name:"jQUery",color:"blue"}, {name:"Semantic UI",color:"teal"}],
    thumbnail: "img/randomquote.png",
    url: "http://codepen.io/radzen/full/rxNoqK/",
  },
  {
    title: "Javascript Calculator",
    description: ["A simple calculator made with HTML, CSS and Javascript.","jQuery was mainly used for selecting elements (eg: buttons). Creating the input history was very challenging at the time."],
    skills: [{name:"jQUery",color:"blue"}],
    thumbnail: "img/simplecalc.png",
    url: "http://codepen.io/radzen/full/KVMYKQ/",
  },
  {
    title: "Pomodoro Timer",
    description: ["The Pomodoro Technique is a time management method that is based on the idea that frequent breaks can improve mental agility.","Animate.css was used to create the bounce effect, which happens when a timer reaches zero."],
    skills: [{name:"Bootstrap",color:"violet"},{name:"jQUery",color:"blue"},{name:"Animate.css",color:"orange"}],
    thumbnail: "img/pomodoro.png",
    url: "http://codepen.io/radzen/full/obxwYr/",
  },
  {
    title: "Local Weather",
    description: ["A weather app that makes use of your browser's geolocation or GPS if viewed on a mobile device.","This project uses Weather Underground's API. The background gradient changes colors based on location's current time."],
    skills: [{name:"WU API",color:"teal"},{name:"Bootstrap",color:"violet"},{name:"jQUery",color:"blue"}],
    thumbnail: "img/localweather.png",
    url: "http://codepen.io/radzen/full/PZpoqa/",
  },
  {
    title: "Wikipedia Viewer",
    description: ["Users can search for a topic or generate one at random with this wikipedia search app.","Related articles will be displayed with an image from the article (if any) and a brief description. This app uses MediaWiki's API and a jQuery autocomplete plugin for the search box."],
    skills: [{name:"Wiki API",color:"teal"},{name:"jQUery",color:"blue"},{name:"Bootstrap",color:"violet"}],
    thumbnail: "img/wikiview.png",
    url: "http://codepen.io/radzen/full/BjRMjK/",
  },
  // {
  //   title: "Camper News",
  //   description: ["A remake of FreeCodeCamp's Camper News.", "This app displays the news articles in a pinterest-like grid. Masonry was used to achieve this effect. "],
  //   skills: [{name:"FCC API",color:"teal"},{name:"jQUery",color:"blue"},{name:"Masonry",color:"pink"},{name:"Animate.css",color:"orange"},],
  //   thumbnail: "img/fccnews1_1.png",
  //   url: "http://codepen.io/radzen/full/YwZdVd/",
  // },
  {
    title: "Twitch Status",
    description: ["Twitch.tv is a live streaming video platform owned by Twitch Interactive.","This web app checks a list of pre-selected users' online status on Twitch.tv. Semantic UI was perfect for this project."],
    skills: [{name:"jQUery",color:"blue"},{name:"Semantic UI",color:"teal"}],
    thumbnail: "img/twitchstatus.png",
    url: "http://codepen.io/radzen/full/xZYWNJ/",
  },
  {
    title: "Tic Tac Toe",
    description: ["A game of tic tac toe using the minimax algorithm. Minimax is a recursive algorithm for choosing the next move usually in a two-player game. Good luck on beating this one."],
    skills: [{name:"jQUery",color:"blue"}],
    thumbnail: "img/tictactoe.png",
    url: "http://codepen.io/radzen/full/QNpKPz/",
  }
  ];

  $timeout(dimmer,0);

});

function dimmer() {
  $('.ui.medium.image').dimmer({
    on: 'hover'
  });
}

$(document).on("scroll",function(){
  if($(document).scrollTop()>30){
    $(".nav").removeClass("big").removeClass("teal").addClass("black");
  } else{
    $(".nav").addClass("big").removeClass("black").addClass("teal");
  }
});



var interval = setInterval(blink, 3000);
var roll = setInterval(look, 5000);

function blink() {
  $(".eyes").attr("ry",0.2);
  setTimeout(function() {
    $(".eyes").attr("ry",9);
  },200);
  clearInterval(interval);
  var i = Math.floor(Math.random() * (5000 - 500)) +500;
  interval = setInterval(blink, i);
}

function look() {
  var i = Math.floor(Math.random()*2)
  if (i == 1) i = 5;
  if (i == 0) i = -5;

  var l = $(".left-eye").attr("cx");
  var r = $(".right-eye").attr("cx");

  $(".left-eye").attr("cx",parseInt(l) + i);
 $(".right-eye").attr("cx",parseInt(r) + i);

  setTimeout(function() {
    $(".left-eye").attr("cx",l);
    $(".right-eye").attr("cx",r);
  },2000);
}

$('.nav-item').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').stop().animate({
       scrollTop: $(target).offset().top
    }, 800);
});


$('.burger').click(function() {
  $('.ui.sidebar')
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('toggle')
  ;
});

$(".sidebar-item").click(function(e) {
  $('.ui.sidebar')
    .sidebar('hide')
  ;
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').stop().animate({
       scrollTop: $(target).offset().top
    }, 800);
})
