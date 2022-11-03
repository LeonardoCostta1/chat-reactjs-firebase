import React from "react";
import { motion } from "framer-motion";
import './style.css';

function LCButton() {
  return (
    <motion.button className="lcButton" type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <i className="fa-regular fa-paper-plane"></i>
  </motion.button>
  );
}

export default LCButton;
