var interval, lx;
interval = setInterval(blink, 3000);
lx = setInterval(look, 5000);

$(document).on("scroll",function(){
  if($(document).scrollTop()>20){
    $(".nav").removeClass("big").removeClass("teal").addClass("black");
  } else{
    $(".nav").addClass("big").removeClass("black").addClass("teal");;
  }
});

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
  if (i == 1) i = 7;
  if (i == 0) i = -7;
  
  var l = $(".left-eye").attr("cx");
  var r = $(".right-eye").attr("cx");
  
  $(".left-eye").attr("cx",parseInt(l) + i);
  $(".right-eye").attr("cx",parseInt(r) + i);
  
  setTimeout(function() {
    $(".left-eye").attr("cx",l);
    $(".right-eye").attr("cx",r);
  },2000);  

}