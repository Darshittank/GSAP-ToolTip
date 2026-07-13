const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Line objects
const lines = [];

for (let i = 0; i < 25; i++) {
    lines.push({
        x: Math.random() * w,
        y: Math.random() * h,
        length: 100 + Math.random() * 150,
        angle: Math.random() * Math.PI,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.1
    });
}

// Animate using GSAP ticker
gsap.ticker.add(() => {
    ctx.clearRect(0, 0, w, h);

    lines.forEach(line => {

        // Move randomly
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // Bounce edges
        if (line.x < 0 || line.x > w) line.angle = Math.PI - line.angle;
        if (line.y < 0 || line.y > h) line.angle = -line.angle;

        // Draw line
        const x2 = line.x + Math.cos(line.angle) * line.length;
        const y2 = line.y + Math.sin(line.angle) * line.length;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${line.opacity})`; // blue tone
        ctx.lineWidth = 1;
        ctx.stroke();
    });
});
