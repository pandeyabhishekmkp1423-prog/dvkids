import { useState, useEffect, useRef } from 'react';

export const use3DTilt = (maxTilt = 15, enabled = true) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setTilt({
        x: Math.max(-maxTilt, Math.min(maxTilt, y * maxTilt)),
        y: Math.max(-maxTilt, Math.min(maxTilt, -x * maxTilt))
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, enabled]);

  return { tilt, elementRef };
};