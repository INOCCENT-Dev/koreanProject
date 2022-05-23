window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  //canvas.style.width = window.width +'';
  //canvas.style.height = window.height +'';
  img.onload = function(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

    canvas.addEventListener('click',function(event){
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(0,0,1280,640);
      console.log(event.offsetX,event.offsetY);
      ctx.drawImage(img,event.offsetX-100,event.offsetY-50,200,100,0,0,1280,640);
    });

    setInterval(function(){
      drawPixel(ctx,imageData);
    },33);
  };
  img.src = "img/map.svg"
};

function drawPixel(ctx,data){
  for(let x = 10; x < data.width; x += 20){
    //setTimeout(function(){},500);

    ctx.fillStyle = 'rgb(255,255,255)';
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

