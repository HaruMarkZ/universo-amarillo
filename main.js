const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let branches = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Generador de partículas de polvo galáctico dorado
class CosmicDust {
    constructor() {
        this.reset();
        this.y = Math.random() * height; // Distribución inicial en pantalla
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) this.reset();
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = '#ffca28';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffca28';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Inicializar el polvo estelar (120 partículas fluidas de alto rendimiento)
for(let i = 0; i < 120; i++) {
    particles.push(new CosmicDust());
}

// Dibujar una flor realista basada en matemáticas procedimentales
function drawCosmicFlower(centerX, centerY, size) {
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Dibujo matemático de los pétalos simétricos dorados
    const petals = 12;
    for (let i = 0; i < petals; i++) {
        ctx.rotate((Math.PI * 2) / petals);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Curvas Bezier para modelar pétalos orgánicos vectoriales de alta fidelidad
        ctx.bezierCurveTo(-size/2, -size/2, -size/3, -size, 0, -size);
        ctx.bezierCurveTo(size/3, -size, size/2, -size/2, 0, 0);
        
        let grad = ctx.createLinearGradient(0, 0, 0, -size);
        grad.addColorStop(0, '#f57f17'); // Base naranja cálida
        grad.addColorStop(0.5, '#ffca28'); // Centro amarillo brillante
        grad.addColorStop(1, '#fff59d'); // Punta luminosa
        
        ctx.fillStyle = grad;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffb300';
        ctx.fill();
    }

    // Núcleo botánico de la flor
    ctx.beginPath();
    ctx.arc(0, 0, size / 3.5, 0, Math.PI * 2);
    let coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 3.5);
    coreGrad.addColorStop(0, '#3e2723');
    coreGrad.addColorStop(0.8, '#5d4037');
    coreGrad.addColorStop(1, '#271510');
    ctx.fillStyle = coreGrad;
    ctx.fill();
    
    ctx.restore();
}

// Motor de Renderizado Continuo a 60 FPS
function renderLoop() {
    // Fondo sutilmente traslúcido para dar efecto de estela y velocidad cósmica
    ctx.fillStyle = 'rgba(2, 1, 8, 0.08)';
    ctx.fillRect(0, 0, width, height);

    // Actualizar y dibujar partículas
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Dibujar el ramo principal de 3 flores en composición áurea (Centro inferior)
    const baseCenterX = width / 2;
    const baseCenterY = height * 0.65;

    // Tallos orgánicos bioluminiscentes
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#2e7d32';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#81c784';

    // Tallo 1 (Izquierda)
    ctx.beginPath();
    ctx.moveTo(baseCenterX, height);
    ctx.quadraticCurveTo(baseCenterX - 80, baseCenterY + 100, baseCenterX - 90, baseCenterY + 40);
    ctx.stroke();

    // Tallo 2 (Derecha)
    ctx.beginPath();
    ctx.moveTo(baseCenterX, height);
    ctx.quadraticCurveTo(baseCenterX + 80, baseCenterY + 100, baseCenterX + 90, baseCenterY + 40);
    ctx.stroke();

    // Tallo 3 (Central)
    ctx.beginPath();
    ctx.moveTo(baseCenterX, height);
    ctx.quadraticCurveTo(baseCenterX, baseCenterY + 80, baseCenterX, baseCenterY - 40);
    ctx.stroke();
    ctx.restore();

    // Dibujar cabezas de flores en los extremos de los tallos
    drawCosmicFlower(baseCenterX - 90, baseCenterY + 40, 50); // Flor izquierda
    drawCosmicFlower(baseCenterX + 90, baseCenterY + 40, 50); // Flor derecha
    drawCosmicFlower(baseCenterX, baseCenterY - 40, 65);     // Flor principal centro

    requestAnimationFrame(renderLoop);
}

// Lógica de control del reproductor de audio
function toggleAudio() {
    const song = document.getElementById('bg-song');
    const btn = document.querySelector('.btn-audio');
    
    if (song.paused) {
        song.play().catch(err => console.log("Interacción requerida para audio de fondo"));
        btn.innerText = "⏸️ Pausar Música";
        btn.style.background = "rgba(255, 202, 40, 0.2)";
    } else {
        song.pause();
        btn.innerText = "🎵 Activar Música";
        btn.style.background = "rgba(255, 255, 255, 0.05)";
    }
}

// Arrancar el motor visual automáticamente al cargar la ventana
window.onload = () => {
    renderLoop();
};
