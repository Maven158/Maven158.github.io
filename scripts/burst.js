export function loadCanvas() {
  const canvas = document.createElement('canvas');
  const element = document.getElementsByClassName('burstBox');
  $(element).append(canvas);
  $(canvas).addClass('burst');
  const ctx = canvas.getContext('2d');
  const size = [4, 8, 12, 16, 20, 24, 28, 32];
  const colors = ['#fd79a8', '#e84393', '#ffeaa7', '#fdcb6e', '#55efc4', '#00b894', '#6c5ce7', '#a29bfe'];
  const particles = Array.from({ length: 500 }, initializeParticle);
  // base_image = new Image();
  // base_image.src = 'images/banner.png';
  // base_image.onload = function(){
  //   // ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height);
  // }

  function initializeParticle() {
    return {
      x: (Math.random() * canvas.width/200) + canvas.width/2,
      y: canvas.height/2,
      dx: Math.random() * 3 - 0,
      dy: Math.random() * 3 - 0,
      dirx: Math.random() * 2 - 1,
      diry: Math.random() * 2 - 1,
      fillStyle: colors[Math.floor(Math.random() * 8)],
      font: size[Math.floor(Math.random() * 8)] + 'px bold sans-serif'
    }
  }
// context.drawImage(image, 0, 0, canvas.width, canvas.height);
  function update(time) {
    particles.forEach(updateParticle);
    draw(time);
    requestAnimationFrame(update);
  }

  function updateParticle(particle) {
    // if(particle.y < 0 || particle.x < 0 || particle.x > canvas.width || particle.y > canvas.height) {
    //   particle.x = (Math.random() * canvas.width/200) + canvas.width/2;
    //   particle.y = canvas.height/2;
    // } 

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