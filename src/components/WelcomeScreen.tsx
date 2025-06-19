import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onEnterMuseum: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterMuseum }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold korean-text text-white mb-4">
            한국어 문법 박물관
          </h1>
          <h2 className="text-2xl md:text-3xl english-text text-blue-200 font-light">
            Korean Grammar Museum
          </h2>
        </motion.div>

        {/* Mascot Character */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl md:text-9xl"
            >
              🏛️
            </motion.div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-xl md:text-2xl korean-text text-blue-100 mb-4 leading-relaxed">
            한국어 문법의 신비로운 세계로 떠나는 여행
          </p>
          <p className="text-lg english-text text-blue-200 leading-relaxed">
            Embark on a magical journey through the world of Korean grammar
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '🎨', title: '생동감 있는 전시', desc: 'Interactive Exhibitions' },
            { icon: '🎮', title: '재미있는 게임', desc: 'Fun Mini-Games' },
            { icon: '📚', title: '개인 노트', desc: 'Personal Notebook' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="korean-text text-white font-semibold mb-1">{feature.title}</h3>
              <p className="english-text text-blue-200 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enter Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(205, 46, 58, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnterMuseum}
          className="group bg-gradient-to-r from-korean-red to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-korean-red/30 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <span className="korean-text">박물관 입장하기</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="english-text text-blue-300 mt-4 text-sm"
        >
          Enter the Museum
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;