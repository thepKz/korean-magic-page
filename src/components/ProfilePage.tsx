import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-300">
        {t('auth.login')} {t('common.required') || ''}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl mb-6">{t('entrance.profile')}</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md grid gap-4 max-w-md mx-auto">
        <div>
          <span className="text-gray-400">{t('auth.username')}: </span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="text-gray-400">Email: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="text-gray-400">Role: </span>
          <span>{user.role}</span>
        </div>
        <div>
          <span className="text-gray-400">Level: </span>
          <span>{user.profile.level}</span>
        </div>
        <div>
          <span className="text-gray-400">Target Level: </span>
          <span>{user.profile.targetLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 