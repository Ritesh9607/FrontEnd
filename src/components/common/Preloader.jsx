import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="preloader-overlay">
      <motion.div
        className="preloader-content"
        initial={{ scale: 0.6, filter: "blur(12px)", opacity: 0 }}
        animate={{ 
          scale: [0.6, 1.05, 1], 
          filter: ["blur(12px)", "blur(0px)", "blur(0px)"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ duration: 2.8, times: [0, 0.4, 0.8, 1], ease: "easeOut" }}
      >
        {/* FINANCE (White) GOV (Yellow) */}
        <h1 className="brand-name">
          <span className="text-white">Finance</span>
          <span className="text-yellow">Gov</span>
        </h1>
        
        {/* Tagline below */}
        <p className="tagline">National Financial Regulation</p>
      </motion.div>
    </div>
  );
};

export default Preloader;