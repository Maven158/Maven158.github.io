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
    var size = [8, 16, 24, 32, 36, 40, 44, 48];
    var colors = ['#e84393', '#00b894', '#6c5ce7'];
    // var colors = ['#fd79a8', '#e84393', '#ffeaa7', '#fdcb6e', '#55efc4', '#00b894', '#6c5ce7', '#a29bfe'];
    var particles = Array.from({ length: 500 }, initializeParticle);
    var doAnim = true;
  } // else {
  //   element[0].removeChild(canvas[0]);
  //   particles = [];
  //   ctx = null;
  //   doAnim = false;
  // }

  function initializeParticle() {
    return {
      x: canvas[0].width/6.3,
      y: canvas[0].height/1.5,
      dx: (Math.random()) * 5,
      dy: (Math.random()) * 5,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      fillStyle: colors[Math.floor(Math.random() * 3)],
      font: size[Math.floor(Math.random() * 8)] + 'px bold sans-serif'
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
    if ((particle.y < 0 || particle.y > canvas[0].height + 48) || (particle.x > canvas[0].width || particle.x < -48)) {
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
    ctx.font = particle.font;
    ctx.fillText('•', particle.x, particle.y);
    ctx.fillStyle = particle.fillStyle;
  }
  update();
}