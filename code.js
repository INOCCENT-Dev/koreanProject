window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0,600,400);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    console.log(imageData);
    drawPixel(ctx,imageData);
  };
  img.src = "img/garden.jpg"
};

function drawPixel(ctx,data){
  ctx.beginPath();

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0,0,data.width,data.height);

  for(let x = 0; x < data.width / 20; x ++){
    for(let y = 0; y < data.height / 20; y ++){
      ctx.fillStle = getRGB(x*10,y*10,data);
      ctx.arc(x*10,y*10,10,0,2*Math.PI,true);
      ctx.fill();
    }
  }
}

function getRGB(x,y,data){
  let R = data[imageData.width * 4 * y + 4 * x];
  let G = data[imageData.width * 4 * y + 4 * x + 1];
  let B = data[imageData.width * 4 * y + 4 * x + 2];
  let rgb = "rgb(" + R + "," + G + "," + B + ")"
  return rgb;
}