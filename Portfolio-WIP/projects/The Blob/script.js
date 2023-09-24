const blob = document.getElementById("blob");

document.addEventListener('mousemove', function(e) {
  var mouseX = e.clientX;
  var mouseY = e.clientY;
  var targetTop = mouseY - (blob.offsetHeight / 2);
  var targetLeft = mouseX - (blob.offsetWidth / 2);
  blob.animate({
    left: `${targetLeft}px`,
    top: `${targetTop}px`
  }, { duration: 2000, fill: "forwards" });
});
