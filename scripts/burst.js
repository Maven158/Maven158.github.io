export function loadCanvas() {
  if (document.getElementsByClassName('burst').length == 0) {
    var element = document.createElement('canvas');
    var burstBox = document.getElementsByClassName('burstBox');
    var image = document.getElementsByClassName('banner');
    burstBox[0].appendChild(element);
    var canvas = $(burstBox).find('canvas');
    canvas.addClass('burst');
    canvas[0].width = $(image).width() + 24;
	  canvas[0].height = $(image).height() + 24;
    var ctx = canvas[0].getContext('2d');
    var size = [1, 2, 3, 4, 5, 6];
    var borderColors = ['#e84393', '#00b894', '#6c5ce7', '#fdcb6e'];
    var colors = ['#fd79a8', '#55efc4', '#a29bfe', '#ffeaa7'];
    var particles = Array.from({ length: 1000 }, initializeParticle);
    var doAnim = true;
  }

  // window.addEventListener('resize', function() {
  //   canvas[0].width = $(image).width() + 24;
  //   canvas[0].height = $(image).height() + 24;
  // });

  function initializeParticle() {
    var index = Math.floor(Math.random() * 4);
    return {
      x: canvas[0].width/6,
      y: canvas[0].height/2,
      dx: (Math.random()) * 4,
      dy: (Math.random()) * 4,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      color: colors[index],
      border: borderColors[index],
      size: size[Math.floor(Math.random() * 6)]
    }
  }

  function update(time) {
    if (particles && document.getElementsByTagName('canvas')) {
      if (particles.length == 0 && document.getElementsByTagName('canvas').length != 0) {
        burstBox[0].removeChild(canvas[0]);
        doAnim = false;
        ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
        ctx = null;
        loadCanvas();
      }
      if (particles.length == 0 && document.getElementsByTagName('canvas').length == 0) {
        doAnim = false;
        ctx = null;
      }
      if (doAnim) {
        particles.forEach(updateParticle);
        draw(time);
        requestAnimationFrame(update);
      }
    }
  }

  function updateParticle(particle) {
    if ((particle.y < -particle.size || particle.y > canvas[0].height + particle.size) || (particle.x > canvas[0].width + particle.size || particle.x < -particle.size)) {
      particles.splice(particles.indexOf(particle), 1);
    } 
    if (particle.dirx > 0) {
      particle.x = particle.x + particle.dx;
      if (particle.diry > 0) {
        particle.y = particle.y + particle.dy;
      } else {
        particle.y = particle.y - particle.dy;
      }
    } else {
      particle.x = particle.x - particle.dx;
      if (particle.diry > 0) {
        particle.y = particle.y + particle.dy;
      } else {
        particle.y = particle.y - particle.dy;
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    particles.forEach(drawParticle);
  }

  function drawParticle(particle) {
    ctx.beginPath();
    ctx.fillStyle = particle.color;
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = particle.border;
    ctx.stroke();
  }
  update();
}
export function clearCanvas() {
  var burstBox = document.getElementsByClassName('burstBox');
  var canvas = $(burstBox).find('canvas');
  var image = document.getElementsByClassName('banner');
  canvas[0].width = $(image).width() + 24;
	canvas[0].height = $(image).height() + 24;
}