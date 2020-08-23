import { MotionProps } from 'framer-motion';
import { CSSProperties } from 'react';

export const dotProps: (index: number) => MotionProps = index => ({
  animate: {
    scale: [1, 0.9, 0.8, 0.7, 0.8, 0.9, 1],
  },
  style: {
    width: 10,
    height: 10,
    background: 'black',
    borderRadius: '50%',
  },
  transition: {
    duration: 1 / 4,
    loop: Infinity,
    delay: index / 6,
    repeatDelay: 1,
  },
});

export const containerStyle: CSSProperties = {
  display: 'grid',
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: 'auto auto auto auto',
  gridGap: 10,
};
