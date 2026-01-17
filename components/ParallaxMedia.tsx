import React, { useRef, useEffect } from 'react';

interface ParallaxMediaProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0 to 1, where 1 is static and 0 is moving at scroll speed
}

const ParallaxMedia: React.FC<ParallaxMediaProps> = ({ children, className = "", speed = 0.15 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!containerRef.current || !mediaRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if element is in view
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate progress through viewport (-1 to 1)
        const center = rect.top + rect.height / 2;
        const relativeCenter = center / viewportHeight - 0.5;
        
        // Apply offset based on center position
        const yOffset = relativeCenter * viewportHeight * speed;
        mediaRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }
      
      rafId.current = requestAnimationFrame(handleParallax);
    };

    rafId.current = requestAnimationFrame(handleParallax);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`parallax-container ${className}`}>
      <div ref={mediaRef} className="parallax-media w-full absolute left-0 flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default ParallaxMedia;