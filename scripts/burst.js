export function loadCanvas() {
  if (document.getElementsByClassName('burst').length == 0) {
    var cnvs = document.createElement('canvas');
    var element = document.getElementsByClassName('burstBox');
    var image = document.getElementsByClassName('banner');
    element[0].appendChild(cnvs);
    var canvas = $(element).find('canvas');
    canvas.addClass('burst');
    canvas[0].width = $(image).width() + 24;
	  canvas[0].height = $(image).height() + 24;
    var ctx = canvas[0].getContext('2d');
    var size = [1, 2, 3, 4, 5, 6];
    var borderColors = ['#e84393', '#00b894', '#6c5ce7', '#fdcb6e'];
    var colors = ['#fd79a8', '#55efc4', '#a29bfe', '#ffeaa7'];
    var particles = Array.from({ length: 750 }, initializeParticle);
    var doAnim = true;
  }

  function initializeParticle() {
    var index = Math.floor(Math.random() * 4);
    return {
      x: canvas[0].width/6.3,
      y: canvas[0].height/1.5,
      dx: (Math.random()) * 5,
      dy: (Math.random()) * 5,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      color: colors[index],
      border: borderColors[index],
      size: size[Math.floor(Math.random() * 6)], // + 'px bold sans-serif'
    }
  }

  function update(time) {
    if (particles.length == 0 && document.getElementsByTagName('canvas').length != 0) {
      element[0].removeChild(canvas[0]);
      doAnim = false;
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

  function updateParticle(particle) {
    if ((particle.y < 0 || particle.y > canvas[0].height + 16) || (particle.x > canvas[0].width || particle.x < - 16)) {
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
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI*2, true);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = particle.border;
    ctx.stroke();
    // ctx.font = particle.font;
    // ctx.fillText('•', particle.x, particle.y);
    // ctx.fillStyle = particle.fillStyle;
  }
  update();
}
export function clearCanvas() {
  var element = document.getElementsByClassName('burstBox');
  element[0].removeChild($(element).find('canvas')[0]);
  loadCanvas();
}