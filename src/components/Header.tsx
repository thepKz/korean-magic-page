import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
          {!user && (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-colors"
            >
              <LogIn size={18} />
              {t('auth.login')} / {t('auth.register')}
            </button>
          )}
          {user && (
            <div className="relative group">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
              >
                <UserIcon size={18} />
                {user.username || t('entrance.profile')}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
                >
                  <LogOut size={16} />
                  {t('auth.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 