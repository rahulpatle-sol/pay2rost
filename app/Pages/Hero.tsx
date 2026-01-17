'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './HeroDoodle.module.css';

const Doodle = ({ id }: { id: string }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveEye = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const eye = eyeRef.current;
      if (!eye) return;
      const rect = eye.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx);
      eye.style.transform = `rotate(${angle}rad)`;
    };
    window.addEventListener('mousemove', moveEye);
    return () => window.removeEventListener('mousemove', moveEye);
  }, []);

  return (
    <motion.div
      className={styles.doodle}
      whileHover={{
        scale: 1.1,
        rotate: [0, 2, -2, 0],
        transition: { duration: 0.6, ease: 'easeInOut' },
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className={styles.body} id={id}>
        <div className={styles.eye} ref={eyeRef} />
        <div className={styles.brow} />
      </div>
    </motion.div>
  );
};

const RoastHero = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="heroText"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className={styles.solanaBadge}>Built on Solana</div>
        <h1>Pay to Roast</h1>
        <p>Get Paid to Be Roasted</p>
        <p className={styles.desc}>
          A web3-based fun platform where users pay to roast someone. The person getting roasted can accept or reject the roast.
        </p>
        <div className={styles.buttons}>
          <motion.button
            className={styles.purple}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            why paytoroast
          </motion.button>
          <motion.button
            className={styles.white}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            how it works
          </motion.button>
        </div>
      </motion.div>

      <div className={styles.doodleRow}>
        <Doodle id="left" />
        <Doodle id="center" />
        <Doodle id="right" />
      </div>
    </motion.section>
  );
};

export default RoastHero;
