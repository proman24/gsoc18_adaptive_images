function responsify(item){
    var owidth, oheight,
        twidth, theight,
        fx1, fy1, fx2, fy2,
        width, height, top, left;
  // TODO these have to be worked on
    owidth = item.offsetWidth;
    oheight = item.offsetHeight;
    twidth = item.parentNode.clientWidth;
    theight = item.parentNode.clientHeight;

    fx1 = Number(item.attributes['data-focus-left'].value);
    fy1 = Number(item.attributes['data-focus-top'].value);
    fx2 = Number(item.attributes['data-focus-right'].value);
    fy2 = Number(item.attributes['data-focus-bottom'].value);
    if( owidth/oheight > twidth/theight ) {
      var fwidth = (fx2-fx1) * owidth;
      if ( fwidth/oheight > twidth/theight ) {
        height = oheight*twidth/fwidth;
        width = owidth*twidth/fwidth;
        left = -fx1*width;
        top = (theight-height)/2;
      } else {
        height = theight;
        width = theight*owidth/oheight;
        left = twidth/2 - (fx1 + fx2)*width/2;
        // if left > 0, it will leave blank on the left, so set it to 0;
        left = left>0?0:left;
        // if width - left < twidth, it will leave blank on the right, so set left = width - twidth
        left = (twidth - left - width)>0?(twidth-width):left;
        top = 0;
      }
    }
    else {
      var fheight = (fy2-fy1) * oheight;
      if ( fheight/owidth > theight/twidth ) {
        width = owidth*theight/fheight;
        height = oheight*theight/fheight;
        top = -fy1*height;
        left = (twidth-width)/2;
      } else {
        width = twidth;
        height = twidth*oheight/owidth;
        top = theight/2 - (fy1 + fy2)*height/2;
        // if top > 0, it will leave blank on the top, so set it to 0;
        top = top>0?0:top;
        // if height - top < theight, it will leave blank on the bottom, so set top = height - theight
        top = (theight - top - height)>0?(theight-height):top;
        left = 0;
      }
    }

    item.parentNode.style.overflow = "hidden";

    item.style.position = "relative";
    item.style.height = height;
    item.style.width = width;
    item.style.left = left;
    item.style.top = top;
  }

window.onload = function() {
  items = document.getElementsByClassName("adaptiveimg");
  for( $index = 0 ; $index < items.length ; $index++){
    items[$index].removeAttribute("style");
    responsify(items[$index]);
  }
}

window.onresize = function() {
  items = document.getElementsByClassName("adaptiveimg");
  for( $index = 0 ; $index < items.length ; $index++){
    items[$index].removeAttribute("style");
    responsify(items[$index]);
  }
}