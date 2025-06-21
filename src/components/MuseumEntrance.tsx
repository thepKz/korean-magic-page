import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CreditCard,
  Gamepad2,
  LogIn,
  Puzzle, ShieldCheck,
  TrendingUp
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GrammarLevel } from '../types/grammar';
import LanguageSwitcher from './LanguageSwitcher';

interface MuseumEntranceProps {
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onOpenAdmin: () => void;
}

const MuseumEntrance: React.FC<MuseumEntranceProps> = ({ 
  onOpenAuth,
  isLoggedIn,
  onOpenAdmin
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const levels = [
    {
      id: 'beginner' as GrammarLevel,
      korean: '초급',
      english: t('levels.beginner'),
      description: 'Basic Grammar',
      count: '2 grammar points',
      color: 'border-emerald-500/30 hover:border-emerald-400/50',
      gradient: 'from-emerald-500/10 to-green-500/10',
      disabled: false,
    },
    {
      id: 'intermediate' as GrammarLevel,
      korean: '중급',
      english: t('levels.intermediate'), 
      description: 'TOPIK Level 3',
      count: '50 grammar points',
      color: 'border-blue-500/30 hover:border-blue-400/50',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      disabled: false,
    },
    {
      id: 'advanced' as GrammarLevel,
      korean: '고급',
      english: t('levels.advanced'),
      description: 'Advanced Grammar',
      count: '1 grammar point',
      color: 'border-purple-500/30 hover:border-purple-400/50',
      gradient: 'from-purple-500/10 to-pink-500/10',
      disabled: false,
    }
  ];

  const features = [
    {
      id: 'notebook',
      icon: <BookOpen className="w-6 h-6" />,
      korean: '개인 노트',
      english: t('features.notes'),
      description: t('features.notes_desc'),
      color: 'text-blue-400',
      disabled: false,
    },
    {
      id: 'flashcards',
      icon: <CreditCard className="w-6 h-6" />,
      korean: '플래시카드',
      english: t('features.flashcards'),
      description: t('features.flashcards_desc'),
      color: 'text-purple-400',
      disabled: true,
    },
    {
      id: 'games',
      icon: <Gamepad2 className="w-6 h-6" />,
      korean: '문법 게임',
      english: t('features.games'),
      description: t('features.games_desc'),
      color: 'text-green-400',
      disabled: false,
    },
    {
      id: 'interactive-games',
      icon: <Puzzle className="w-6 h-6" />,
      korean: '인터랙티브 게임',
      english: t('features.interactive_games'),
      description: t('features.interactive_games_desc'),
      color: 'text-orange-400',
      disabled: true,
    },
    {
      id: 'progress',
      icon: <TrendingUp className="w-6 h-6" />,
      korean: '학습 진도',
      english: t('features.progress'),
      description: t('features.progress_desc'),
      color: 'text-emerald-400',
      disabled: false,
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      korean: '고급 분석',
      english: t('features.analytics'),
      description: t('features.analytics_desc'),
      color: 'text-cyan-400',
      disabled: true,
    }
  ];

  const handleLevelClick = (level: typeof levels[0]) => {
    if (level.disabled) return;
    navigate(`/rooms/${level.id}`);
  };

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.disabled) return;
    navigate(`/${feature.id}`);
  };
  
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      <div className="flex items-center justify-between mb-16">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('entrance.back')}</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl font-light korean-text text-white mb-2">
            한국어 문법 박물관
          </h1>
          <p className="text-sm english-text text-gray-400">
            Korean Grammar Museum
          </p>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAdmin}
              className="flex items-center gap-2 bg-red-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-red-400/20 text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm">{t('entrance.admin')}</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAuth}
            className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/20 text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm">{isLoggedIn ? t('entrance.profile') : t('entrance.login')}</span>
          </motion.button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            {t('entrance.title')}
          </h2>
          <p className="text-lg text-gray-400">
            {t('entrance.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                y: level.disabled ? 0 : -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: level.disabled ? 1 : 0.98 }}
              onClick={() => handleLevelClick(level)}
              className={`relative bg-gradient-to-br ${level.gradient} backdrop-blur-sm border-2 ${level.color} rounded-2xl p-8 transition-all duration-300 group hover:shadow-2xl ${level.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {level.disabled && (
                <div className="absolute top-2 right-2 bg-gray-900/50 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {t('coming_soon')}
                </div>
              )}
              <div className="text-center">
                <h3 className={`text-2xl font-medium korean-text text-white mb-2 transition-transform ${!level.disabled && 'group-hover:scale-105'}`}>
                  {level.korean}
                </h3>
                <p className="english-text text-gray-300 mb-4 font-light">
                  {level.english}
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  {level.description}
                </p>
                <p className="text-xs text-gray-500">
                  {level.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: feature.disabled ? 1 : 1.05 }}
              whileTap={{ scale: feature.disabled ? 1 : 0.95 }}
              onClick={() => handleFeatureClick(feature)}
              className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all group ${feature.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'}`}
            >
              {feature.disabled && (
                <div className="absolute top-2 right-2 bg-gray-900/50 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {t('coming_soon')}
                </div>
              )}
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={`${feature.color} mb-4 transition-transform ${!feature.disabled && 'group-hover:scale-110'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-medium mb-1">
                  {feature.english}
                </h3>
                <p className="korean-text text-gray-400 text-sm mb-2">
                  {feature.korean}
                </p>
                <p className="text-gray-500 text-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MuseumEntrance;