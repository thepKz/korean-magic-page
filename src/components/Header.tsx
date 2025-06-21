import { LogIn } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate('/')}
        >
          Korean<span className="text-cyan-400">Magic</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-colors"
          >
            <LogIn size={18} />
            {t('auth.login')} / {t('auth.register')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 