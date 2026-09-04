document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("space-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            increasing: Math.random() > 0.5
        });
    }

    let shootingStar = null;

    function createShootingStar() {
        const startX = Math.random() * (width * 0.8);
        const startY = Math.random() * (height * 0.4);
        shootingStar = {
            x: startX,
            y: startY,
            length: Math.random() * 80 + 60,
            speed: Math.random() * 8 + 6,
            angle: Math.PI / 4, // 45 grados de inclinación
            alpha: 1
        };
    }

    function scheduleShootingStar() {
        const delay = Math.random() * 4000 + 3000; // Entre 3 y 7 segundos
        setTimeout(() => {
            createShootingStar();
            scheduleShootingStar();
        }, delay);
    }
    scheduleShootingStar();

    function animateBackground() {
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createRadialGradient(width / 2, height / 2 - 50, 50, width / 2, height / 2, 400);
        gradient.addColorStop(0, "rgba(212, 175, 55, 0.08)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            if (star.increasing) {
                star.alpha += star.speed;
                if (star.alpha >= 1) star.increasing = false;
            } else {
                star.alpha -= star.speed;
                if (star.alpha <= 0.2) star.increasing = true;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${star.alpha * 0.7})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#d4af37";
            ctx.fill();
        });

        if (shootingStar) {
            const endX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
            const endY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

            const starGradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
            starGradient.addColorStop(0, `rgba(255, 235, 170, ${shootingStar.alpha})`);
            starGradient.addColorStop(1, "rgba(212, 175, 55, 0)");

            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = starGradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Desplazar estrella fugaz
            shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
            shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
            shootingStar.alpha -= 0.015;

            if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
                shootingStar = null;
            }
        }

        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    const textContainer = document.getElementById("text-container");
    const fullText = "Quiero aprender a quererte como nadie lo ha hecho y demostrártelo día a día con hechos; no me resulta fácil mostrarme de esta manera, pero elijo volverme vulnerable contigo para que veas lo que de verdad siento cuando te tengo cerca.";

    setTimeout(() => {
        startTypingEffect();
    }, 3600);

    function startTypingEffect() {
        let index = 0;
        textContainer.textContent = "";

        function typeLetter() {
            if (index < fullText.length) {
                textContainer.textContent += fullText.charAt(index);
                index++;
                setTimeout(typeLetter, 45);
            }
        }

        typeLetter();
    }
});