let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
  eyeL.style.cssText = `
    left:0.6em;
    top: 0.6em;
  `;
  eyeR.style.cssText = `
  right:0.6em;
  top:0.6em;
  `;
};

let normalHandStyle = () => {
  handL.style.cssText = `
        height: 2.81em;
        top:8.4em;
        left:7.5em;
        transform: rotate(0deg);
    `;
  handR.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        right: 7.5em;
        transform: rotate(0deg)
    `;
};
//When clicked on username input
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `
    left: 0.75em;
    top: 1.12em;  
  `;
  eyeR.style.cssText = `
    right: 0.75em;
    top: 1.12em;
  `;
  normalHandStyle();
});
//When clicked on password input
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);    
    `;
  handR.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    right: 11.75em;
    transform: rotate(155deg);
  `;
  normalEyeStyle();
});
//When clicked outside username and password input
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (clickedElem != usernameRef && clickedElem != passwordRef) {
    normalEyeStyle();
    normalHandStyle();
  }
});

// Create the canvas and add it to the DOM
const canvas = document.createElement('canvas');
canvas.id = 'snowCanvas';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

// Resize the canvas to cover the whole screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle snow effect for creating
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2; // Snowflake size (randomized)
    this.color = 'white'; // Snow color
    this.speedX = (Math.random() - 0.5) * 0.5; // Slight random horizontal speed
    this.speedY = Math.random() * 1 + 0.5; // Snow falls downward
  }

  // Draw the particle as a small snowflake
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update the particle position
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // If the particle reaches the bottom, reset it to the top
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    }
  }
}

// Create a new particle at the mouse position every 50 milliseconds
let lastMouseMoveTime = 0;
const particleInterval = 50; // 50ms interval for particle creation

document.addEventListener('mousemove', (event) => {
  const currentTime = Date.now();

  // Only create a particle every 50ms to limit the rate
  if (currentTime - lastMouseMoveTime > particleInterval) {
    lastMouseMoveTime = currentTime;

    const mouseX = event.x;
    const mouseY = event.y;

    // Create a new particle at the mouse position
    particles.push(new Particle(mouseX, mouseY));
  }
});

// Set the background color of the canvas
ctx.fillStyle = '#e0f7fa'; // Light cyan background to match your color choice
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Animation loop to update and draw particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Update and draw all particles (snowflakes)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  requestAnimationFrame(animate); // Continue the animation loop
}

animate();
