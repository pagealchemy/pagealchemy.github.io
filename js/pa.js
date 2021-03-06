if (Modernizr.touch) {
}
else 
{
var ballCount = 50,
    ballMinSize = 4, 
    ballMaxSize = 10,
    container = $('#top');
$(function() {
  initBalls();
  balls = window.setInterval(moveBalls,40); // 24 FPS
  $(window).resize(function() { moveBallsIntoBounds(); });
});
function rand(min,max,isInt) {
  var min = min || 0, 
      max = max || 1, 
      isInt = isInt || false,
      num = Math.random()*(max - min) + min;
  return (isInt) ? Math.round(num) : num;
}
function initBalls() {
  container.css({'position':'relative'});
  for (i=0;i<ballCount;i++) {
    var newBall = $('<b />').appendTo(container),
        size = rand(ballMinSize,ballMaxSize);
    newBall.css({
      'position':'absolute',
      'width': size+'px',
      'height': size+'px',
      'opacity': rand(.1,.8),
      'background-color': 'rgb('+rand(0,255,true)+','+rand(0,255,true)+','+rand(0,255,true)+')',
      'top': rand(0,container.height()-size),
      'left': rand(0,container.width()-size)
    }).attr({
    'data-dX':rand(-1,1),
       'data-dY':rand(0.3,0.6)
    });
  }
}
function moveBalls() {
  var maxX = container.width(),
      maxY = container.height();
  $('b',container).each(function(i,b) {
    var ball = $(b),
        pos = ball.position()
        x = pos.left,
        y = pos.top,
        dX = parseFloat(ball.attr('data-dX')),
        dY = parseFloat(ball.attr('data-dY')),
        size = ball.height();
    if(x+dX+size > maxX || x+dX < 0) ball.attr('data-dX',(dX=-dX)); 
    if(y+dY+size > maxY || y+dY < 0) ball.attr('data-dY',(dY=-dY)); 
    ball.css({'top':y+dY,'left':x+dX});
  });
}
function moveBallsIntoBounds() {
  var maxX = container.width(),
      maxY = container.height();  
  $('b',container).each(function(i,b) {
    var ball = $(b),
        pos = ball.position()
        x = pos.left,
        y = pos.top,
        size = ball.height();
    if (x+size > maxX) ball.css({ left: maxX-size+'px' });;
    if (y+size > maxY) ball.css({ top: maxY-size+'px' });;    
  });
}

    }
