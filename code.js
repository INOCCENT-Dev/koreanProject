window.onload = function() {
  const canvas = document.getElementById("mycanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0,600,400);
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    console.log(imageData);
  };
  img.src = "img/garden.jpg"
};