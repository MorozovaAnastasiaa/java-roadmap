import { useEffect, useRef } from 'react';

export const Aurora = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waves = [
        { color: '99, 102, 241', offset: 0, amplitude: 80, frequency: 0.8 },
        { color: '168, 85, 247', offset: 2, amplitude: 60, frequency: 1.2 },
        { color: '59, 130, 246', offset: 4, amplitude: 100, frequency: 0.6 },
        { color: '34, 197, 94', offset: 1, amplitude: 70, frequency: 1.0 },
      ];

      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height * 0.7 +
            Math.sin((x * 0.003 * wave.frequency) + time + wave.offset) * wave.amplitude +
            Math.sin((x * 0.007 * wave.frequency) + time * 1.5 + wave.offset) * wave.amplitude * 0.5;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${wave.color}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${wave.color}, 0.04)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Top glow
      const topGlow = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
      topGlow.addColorStop(0, 'rgba(99, 102, 241, 0.05)');
      topGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
