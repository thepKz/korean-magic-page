import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onEnterMuseum: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterMuseum }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-light korean-text text-white mb-6 tracking-wide">
            한국어 문법 박물관
          </h1>
          <h2 className="text-xl md:text-2xl english-text text-gray-300 font-light">
            Korean Grammar Museum
          </h2>
        </motion.div>

        {/* Simple Description */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <p className="text-lg korean-text text-gray-400 mb-2">
            한국어 문법을 체계적으로 학습하세요
          </p>
          <p className="text-base english-text text-gray-500">
            Learn Korean grammar systematically
          </p>
        </motion.div>

        {/* Enter Button */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnterMuseum}
          className="group bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-lg font-light shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <span className="korean-text">시작하기</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;