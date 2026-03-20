import { useEffect, useRef } from 'react';

interface DotGridProps {
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  hoverRadius?: number;
  hoverScale?: number;
}

export const DotGrid = ({
  dotSize = 1,
  gap = 28,
  hoverRadius = 200,
  hoverScale = 1.6,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>(0);
  const targetDotsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const scrollY = scrollRef.current;
      const mouse = mouseRef.current;

      // Calculate visible dot range with scroll offset
      const offsetY = scrollY % gap;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap - offsetY;

          // Skip dots outside viewport
          if (y < -gap || y > height + gap) continue;

          // Unique key for this dot position in world space
          const worldY = j * gap + Math.floor(scrollY / gap) * gap;
          const key = `${i}-${Math.floor((worldY + scrollY) / gap)}`;

          // Calculate distance from mouse (in viewport space)
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Target scale based on distance
          let targetScale = 1;
          if (distance < hoverRadius) {
            const t = 1 - distance / hoverRadius;
            targetScale = 1 + (hoverScale - 1) * t * t;
          }

          // Smooth interpolation for current scale
          const currentScale = targetDotsRef.current.get(key) || 1;
          const newScale = currentScale + (targetScale - currentScale) * 0.15;
          targetDotsRef.current.set(key, newScale);

          const radius = dotSize * newScale;

          // Draw dot with varying opacity
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          const baseAlpha = 0.12;
          const alpha = newScale > 1.1
            ? baseAlpha + (newScale - 1) * 0.2
            : baseAlpha;

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // Clean up old dot states
      if (targetDotsRef.current.size > 10000) {
        targetDotsRef.current.clear();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    handleScroll();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dotSize, gap, hoverRadius, hoverScale]);

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
