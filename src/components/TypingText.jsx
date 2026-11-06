import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types out the role text one character at a time, with a blinking cursor.
export default function TypingText({ text, speed = 55 }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return undefined;
    }
    setCount(0);
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, reduce]);

  return (
    <span className="font-sora text-2xl font-semibold text-ink">
      {text.slice(0, count)}
      <span className="ml-1 inline-block h-6 w-2.5 animate-pulse bg-cyan align-middle" aria-hidden="true" />
    </span>
  );
}
