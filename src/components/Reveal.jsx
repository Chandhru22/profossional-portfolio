import { motion, useReducedMotion } from 'framer-motion';

// Fades and slides its children in once they scroll into view.
// Respects prefers-reduced-motion by skipping the animation entirely.
export default function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
