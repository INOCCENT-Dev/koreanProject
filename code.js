window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0,1200,600);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    setTimeout(function(){
      drawPixel(ctx,imageData);
    },500);
  };
  img.src = "img/castle.jpg"
};

function drawPixel(ctx,data){

  for(let x = 0; x < data.width / 20; x ++){
    setTimeout(function(){
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0,0,(x+1)*20,data.height);

      for(let y = 0; y < data.height / 20; y ++){
        ctx.beginPath();
        ctx.fillStyle = getRGB(x*20+10,y*20+10,data);
        ctx.arc(x*20+10,y*20+10,10,0,2*Math.PI,true);
        ctx.fill();
      }
    },100);
  }
}

function getRGB(x,y,data){
  let R = data.data[data.width * 4 * y + 4 * x];
  let G = data.data[data.width * 4 * y + 4 * x + 1];
  let B = data.data[data.width * 4 * y + 4 * x + 2];
  let rgb = "rgb(" + R + "," + G + "," + B + ")";
  console.log(rgb);
  return rgb;
}