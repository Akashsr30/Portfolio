import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with target interpolation (smooth lag)
    const mouse = {
      x: undefined,
      y: undefined,
      tx: undefined,
      ty: undefined,
      radius: 160,
    };

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.tx = undefined;
      mouse.ty = undefined;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.reset();
        // Spread initial particles across viewport
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // micro particles
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.baseAlpha = Math.random() * 0.2 + 0.05;
        this.alpha = this.baseAlpha;
        
        // Premium metallic palette: white, light silver, slate grey
        const colors = [
          'rgba(243, 244, 246, ', // white-ish
          'rgba(156, 163, 175, ', // silver-ish
          'rgba(55, 65, 81, ',   // deep slate
        ];
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Slow vector flow field drift
        this.x += this.speedX + Math.sin(this.y * 0.003) * 0.08;
        this.y += this.speedY + Math.cos(this.x * 0.003) * 0.08;

        // Reactive vector repel from mouse
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.2;
            this.y += Math.sin(angle) * force * 1.2;
            this.alpha = Math.min(this.baseAlpha * 3, 0.7);
          } else {
            this.alpha += (this.baseAlpha - this.alpha) * 0.02;
          }
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.02;
        }

        // Handle bounds reset
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
          if (Math.random() > 0.5) {
            this.x = Math.random() > 0.5 ? 0 : width;
          } else {
            this.y = Math.random() > 0.5 ? 0 : height;
          }
        }
      }

      draw() {
        ctx.fillStyle = `${this.colorPrefix}${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const maxParticles = Math.min(100, Math.floor((width * height) / 15000));
    const particles = Array.from({ length: maxParticles }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      if (mouse.tx !== undefined && mouse.ty !== undefined) {
        if (mouse.x === undefined) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
        } else {
          mouse.x += (mouse.tx - mouse.x) * 0.08;
          mouse.y += (mouse.ty - mouse.y) * 0.08;
        }
      } else {
        mouse.x = undefined;
        mouse.y = undefined;
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Construct mesh grid lines (thin connections)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const alpha = (110 - dist) / 110 * 0.04; // subtle mesh grid
            ctx.strokeStyle = `rgba(243, 244, 246, ${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#030303]"
    />
  );
};

export default BackgroundCanvas;
