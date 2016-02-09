// JavaScript Toons Library
// Written by Joone Hur (joone@outlook.com) 

var AnchorPosition = {
    CENTER_LEFT: 0,
    CENTER_RIGHT: 1,
    LEFT_LEFT: 2,
    LEFT_RIGHT: 3,
    RIGHT_LEFT: 4,
    RIGHT_RIGHT: 5, 
};

var isChrome = /chrome/i.test( navigator.userAgent );

function drawBubble(bubble, startX, startY, anchorX, anchorY, anchorPosition) {
  console.log("Debug Start");
  var canvas = bubble.firstElementChild;
  console.log("canvas id = " + canvas.id);

  canvas.width = bubble.offsetWidth;
  var bubble_width = bubble.offsetWidth;
  var text = bubble.lastElementChild;
  console.log("text id = " + text.id);
  var text_width = bubble.offsetWidth - 20;
  text.style.width = text_width + "px";
  var text_height;
  
  // FIXME: need to reload the html file in Chrome browser.
  if (isChrome)
    text_height = text.offsetHeight / 2;
  else
    text_height = text.offsetHeight;
  
  console.log("text_height=" + text_height);
  bubble.style.height = text_height * 1.8  + "px";
  
  // Ratio between bubble and tail.
  ratio_bubble_tail = 4;

  console.log("canvas size=(" + canvas.width +"," + canvas.height +")");
  console.log("Bubble size=(" + bubble_width +"," + bubble.offsetHeight +")");
  
  // For Retina display.
  scaleFactor = 2;
  canvas.width = Math.ceil(canvas.width * scaleFactor); 
  canvas.height = Math.ceil(bubble.offsetHeight * scaleFactor);
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.scale(scaleFactor, scaleFactor);

  
  /* P1 center of bubble */
  p1_x = bubble_width / 2;
  p1_y = 1;

  ctx.fillRect(p1_x-2, p1_y-2, 4, 4);
  ctx.beginPath();
  ctx.moveTo(p1_x, p1_y);

  // P2 
  p2_x = 2;
  p2_y = text_height * 0.5;
  console.log("p2 = (" + p2_x +"," + p2_y +")");
  
  ctx.quadraticCurveTo(-2, -2, p2_x, p2_y);
  ctx.fillRect(p2_x-2, p2_y-2, 4, 4);

  // P3 (start of tail) : center
  p3_x = bubble_width / 2 - 10;
  //p3_y = text_height + 20;

  p3_y = text_height;
  console.log("p3 = (" + p3_x +"," + p3_y +")");
  ctx.fillRect(p3_x-2, p3_y-2, 4, 4);
  ctx.quadraticCurveTo(0, p3_y, p3_x, p3_y);

  // P4 (anchor)
  if (anchorPosition == AnchorPosition.CENTER_LEFT)
    p4_x = p3_x - 10;
  else
    p4_x = p3_x + 10;
  
  //p4_y = text_height * 1.5;
  p4_y = text_height + 30;
  console.log("p4 = (" + p4_x +"," + p4_y +")");

  ctx.quadraticCurveTo(p3_x - 2, p3_y + (p4_y - p3_y)/2, p4_x, p4_y);

  // P5 (end of tail) 
  tail_width = 10;

  p5_x = p3_x + tail_width;
  p5_y = p3_y;

  if (anchorPosition == AnchorPosition.CENTER_LEFT)
    ctx.quadraticCurveTo(p4_x + 14, p4_y - (p4_y - p3_y)/2, p5_x, p5_y);
  else
    ctx.quadraticCurveTo(p4_x - 7, p4_y - (p4_y - p3_y)/2, p5_x, p5_y);
  
  // P6
  p6_x = bubble_width - 2;
  p6_y = p2_y;
  ctx.quadraticCurveTo(p6_x, p5_y, p6_x, p6_y);

  // To P1
  ctx.quadraticCurveTo(bubble_width, 1, p1_x, p1_y);
  ctx.fillStyle = "White";
  ctx.fill();
  ctx.stroke();

  console.log("text_height=" + text_height);
  console.log("text.offsetHeight=" + text.offsetHeight);
 
  // Set the top of the text.
  text.style.top = (p3_y - text_height) / 2 + "px";
  console.log(p3_y - text_height);
  console.log("Debug End");
}

var left_anchor_bubbles = document.getElementsByClassName("jst_left_anchor_bubble");

for (var i =0; i < left_anchor_bubbles.length; i++ ) {
  drawBubble(left_anchor_bubbles[i], 0, 0, 0, 0, AnchorPosition.CENTER_LEFT);
}


var right_anchor_bubbles = document.getElementsByClassName("jst_right_anchor_bubble");

for (var i =0; i < right_anchor_bubbles.length; i++ ) {
  drawBubble(right_anchor_bubbles[i], 0, 0, 0, 0, AnchorPosition.CENTER_RIGHT);
}
