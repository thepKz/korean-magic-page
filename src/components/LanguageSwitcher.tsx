import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'vi', name: 'VI' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language.split('-')[0];

  return (
    <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full p-1">
      {languages.map(lang => (
        <motion.button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
            currentLanguage === lang.code
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {currentLanguage === lang.code && (
            <motion.div
              layoutId="language-switcher-active"
              className="absolute inset-0 bg-cyan-500/50 rounded-full"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 