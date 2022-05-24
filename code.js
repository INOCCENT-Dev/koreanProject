window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const TIME_INTERVAL = 33;
  const img = new Image();

  let isZoom = false;

  img.onload = function(){
    setTimeout(drawImg,500);

    canvas.addEventListener('click',function(event){
      if(isZoom){
        drawImg();
        isZoom = false;
      }else{
        zoom(event);
        isZoom = true;
      }
    });

    setInterval(function(){
      let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      drawPixel(ctx,imageData);
    },TIME_INTERVAL);
  };

  img.src = "img/map.svg";

  function drawImg(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
  }

  function zoom(event){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,event.offsetX-100,event.offsetY-50,200,100,0,0,canvas.width,canvas.height);
  }
};

function drawPixel(ctx,data){
  for(let x = 10; x < data.width; x += 20){
    ctx.fillStyle = 'white';
    ctx.fillRect(x-10,0,x+10,data.height);

    for(let y = 10; y < data.height; y += 20){
      ctx.beginPath();
      ctx.fillStyle = getRGB(x,y,data);
      ctx.arc(x,y,10,0,2*Math.PI,true);
      ctx.fill();
    }
  }
}

function getRGB(x,y,data){
  let R = data.data[data.width * 4 * y + 4 * x];
  let G = data.data[data.width * 4 * y + 4 * x + 1];
  let B = data.data[data.width * 4 * y + 4 * x + 2];
  let rgb = "rgb(" + R + "," + G + "," + B + ")";
  return rgb;
}