import { useEffect, useState } from 'react';

export function useTypingText(words, speed = 70, pause = 1500) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) {
      return undefined;
    }

    const currentWord = words[wordIndex % words.length];
    const finishedTyping = !isDeleting && displayText === currentWord;
    const finishedDeleting = isDeleting && displayText === "";

    const timeout = setTimeout(
      () => {
        if (finishedTyping) {
          setIsDeleting(true);
          return;
        }

        if (finishedDeleting) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }

        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      },
      finishedTyping ? pause : isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, pause, speed, wordIndex, words]);

  return displayText;
}
