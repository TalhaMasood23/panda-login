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
 canvas.id = 'galaxyCanvas';
 document.body.appendChild(canvas);

 const ctx = canvas.getContext('2d');
 let particles = [];
 let lines = [];

 // Resize the canvas to cover the whole screen
 function resizeCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
 }

 window.addEventListener('resize', resizeCanvas);
 resizeCanvas();

 // Particle class for creating networking-like balls
 class Particle {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.size = 5; // Ball size
     this.color = 'orange'; // Ball color
     this.speedX = (Math.random() - 0.5) * 2; // Random X speed
     this.speedY = (Math.random() - 0.5) * 2; // Random Y speed
     this.alpha = 1; // Full opacity initially
   }

   // Draw the particle as a small orange ball
   draw() {
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
     ctx.fillStyle = this.color;
     ctx.fill();
   }

   // Update the particle position and connect it with nearby particles
   update() {
     this.x += this.speedX;
     this.y += this.speedY;

     // Create lines between particles to simulate networking connections
     for (let i = 0; i < particles.length; i++) {
       const p = particles[i];
       const distance = Math.hypot(this.x - p.x, this.y - p.y);

       // If particles are close enough, connect them with lines
       if (distance < 100) {
         lines.push({ x1: this.x, y1: this.y, x2: p.x, y2: p.y });
       }
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

// Animation loop to update and draw particles with network connections
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Draw all the lines (network connections)
  ctx.beginPath();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.strokeStyle = 'rgba(0, 123, 255, 0.7)'; // Use a contrasting blue for the lines
    ctx.lineWidth = 1;
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
  }
  ctx.stroke();

  // Update and draw all particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  // Clean up old lines that are no longer relevant
  lines = lines.filter(line => {
    const particle1 = particles.find(p => p.x === line.x1 && p.y === line.y1);
    const particle2 = particles.find(p => p.x === line.x2 && p.y === line.y2);
    return particle1 && particle2;
  });

  requestAnimationFrame(animate); // Continue the animation loop
}

animate(); // Start the animation
