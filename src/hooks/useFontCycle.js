import { useState, useEffect } from 'react';

const fonts = [
  'var(--font-kids)',
  'var(--font-comfort)',
  'var(--font-bubble)',
  'var(--font-display)',
  'var(--font-sans)'
];

export const useFontCycle = (interval = 3000) => {
  const [currentFont, setCurrentFont] = useState(fonts[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFont(prev => {
        const currentIndex = fonts.indexOf(prev);
        return fonts[(currentIndex + 1) % fonts.length];
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return currentFont;
};