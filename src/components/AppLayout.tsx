import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface AppLayoutProps {
  onLoginClick: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ onLoginClick }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header onLoginClick={onLoginClick} />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout; 