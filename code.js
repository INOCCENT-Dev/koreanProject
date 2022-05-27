window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  let isZoom = false;

  let resizeCanvas = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  };

  resizeCanvas();

  img.onload = function(){
    let pixelating = () => {
      let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      drawPixel(ctx,imageData);
    };

    drawImg();
    pixelating();

    window.addEventListener('resize',function(){
      resizeCanvas();
      drawImg();
      pixelating();
    });

    canvas.addEventListener('click',function(event){
      if(isZoom){
        drawImg();
        pixelating();
        isZoom = false;
      }else{
        zoom(event);
        pixelating();
        isZoom = true;
      }
    });
  };

  img.src = "img/world.svg";

  function drawImg(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
  }

  function zoom(event){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,event.offsetX-100,event.offsetY-50,200,100,0,0,canvas.width,canvas.height);
  }
};

function drawPixel(ctx,data){
  for(let x = 10; x < data.width; x += 20){
    ctx.fillStyle = 'black';
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