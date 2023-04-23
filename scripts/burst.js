export function loadCanvas() {
  if (document.getElementsByClassName('burst').length == 0) {
    killCanvas();
    var element = document.createElement('canvas');
    var burstBox = document.getElementsByClassName('burstBox');
    var image = document.getElementsByClassName('banner');
    burstBox[0].appendChild(element);
    var canvas = $(burstBox).find('canvas');
    canvas.addClass('burst');
    canvas[0].width = $(image).width() + 24;
	  canvas[0].height = $(image).height() + 24;
    var ctx = canvas[0].getContext('2d');
    var borderColors = ['#e84393', '#00b894', '#6c5ce7', '#fdcb6e', '#00cec9', '#0984e3', '#d63031', '#e17055'];
    var colors = ['#fd79a8', '#55efc4', '#a29bfe', '#ffeaa7', '#81ecec', '#74b9ff', '#ff7675', '#fab1a0'];
    var particles = Array.from({ length: 750 }, initializeParticle);
    var doAnim = true;
  }

  function initializeParticle() {
    var index = Math.floor(Math.random() * 8);
    return {
      x: canvas[0].width/6,
      y: canvas[0].height/2,
      dx: (Math.random() * 5) + .01,
      dy: (Math.random() * 5) + .01,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      color: colors[index],
      border: borderColors[index],
      size: Math.floor(Math.random() * 5)
    }
  }

  function update(time) {
    if (particles && document.getElementsByTagName('canvas')) {
      if (particles.length == 0 && document.getElementsByTagName('canvas').length != 0) {
        ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
        particles = Array.from({ length: 750 }, initializeParticle);
      }
      if (doAnim) {
        particles.forEach(updateParticle);
        draw(time);
        requestAnimationFrame(update);
      } else {
        return;
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
    // if (particles.length < 75) {
    //   canvas[0].style.zIndex = 1;
    // } else {
    //   canvas[0].style.zIndex = -1;
    // }
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
export function resizeCanvas() {
  if ($(document).find('canvas').length != 0) {
    var burstBox = document.getElementsByClassName('burstBox');
    var canvas = $(burstBox).find('canvas');
    var image = document.getElementsByClassName('banner');
    canvas[0].width = $(image).width() + 24;
    canvas[0].height = $(image).height() + 24;
  }
}

export function killCanvas() {
  $(document).find('canvas').each(function() {
    $(this).remove();
  });
  return;
}