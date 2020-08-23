import React from 'react';
import { motion } from 'framer-motion';
import { dotProps, containerStyle } from './styles';
const SuspenseFallback: React.FC = () => {
  return (
    <div style={containerStyle}>
      <motion.div {...dotProps(0)} />
      <motion.div {...dotProps(1)} />
      <motion.div {...dotProps(2)} />
      <motion.div {...dotProps(3)} />
    </div>
  );
};

export default SuspenseFallback;
