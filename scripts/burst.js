export function loadCanvas() {
  if (document.getElementsByClassName('burst').length == 0) {
    var canvas = document.createElement('canvas');
    var element = document.getElementsByClassName('burstBox');
    var image = document.getElementsByClassName('banner');
    $(element).append(canvas);
    $(canvas).addClass('burst');
    console.log($(image).width());
    console.log($(image).height());
    canvas.width = $(image).width() + 24;
	  canvas.height = $(image).height() + 24;
    var ctx = canvas.getContext('2d');
    var size = [8, 12, 16, 20, 24, 28, 32, 36];
    var colors = ['#fd79a8', '#e84393', '#ffeaa7', '#fdcb6e', '#55efc4', '#00b894', '#6c5ce7', '#a29bfe'];
    var particles = Array.from({ length: 500 }, initializeParticle);
    var doAnim = true;
  } else {
    $(canvas).remove();
    particles = [];
    ctx = null;
    doAnim = false;
  }

  function initializeParticle() {
    return {
      x: canvas.width/6.3,
      y: canvas.height/1.8,
      dx: (Math.random() * 4 - 1) + 1,
      dy: (Math.random() * 4 - 1) + 1,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      fillStyle: colors[Math.floor(Math.random() * 8)],
      font: size[Math.floor(Math.random() * 8)] + 'px bold sans-serif'
    }
  }

  function update(time) {
    if (particles.length == 0 && document.getElementsByClassName('burst').length != 0) {
      $(canvas).remove();
      doAnim = false;
      ctx = null;
      loadCanvas();
    }
    if (particles.length == 0 && document.getElementsByClassName('burst').length == 0) {

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
    if ((particle.y < 0 || particle.y > canvas.height) || (particle.x > canvas.width || particle.x < 0)) {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(drawParticle);
  }

  function drawParticle(particle) {
    ctx.font = particle.font;
    ctx.fillText('•', particle.x, particle.y);
    ctx.fillStyle = particle.fillStyle;
  }
  update();
}