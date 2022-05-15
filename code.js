window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    console.log(imageData.__proto__);
    setTimeout(function(){
      drawPixel(ctx,imageData);
    },500);
  };
  img.src = "img/castle.jpg"
};


function drawPixel(ctx,data){

  for(let x = 10; x < data.width; x += 20){
    setTimeout(function(){
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x-10,0,x+10,data.height);

      for(let y = 10; y < data.height; y += 20){
        ctx.beginPath();
        ctx.fillStyle = getRGB(x,y,data);
        ctx.arc(x,y,9,0,2*Math.PI,true);
        ctx.fill();
      }
    },500);
  }
}

function getRGB(x,y,data){
  let R = data.data[data.width * 4 * y + 4 * x];
  let G = data.data[data.width * 4 * y + 4 * x + 1];
  let B = data.data[data.width * 4 * y + 4 * x + 2];
  let rgb = "rgb(" + R + "," + G + "," + B + ")";
  return rgb;
}