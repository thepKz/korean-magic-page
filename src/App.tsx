import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import MuseumEntrance from './components/MuseumEntrance';
import GrammarRooms from './components/GrammarRooms';
import PersonalNotebook from './components/PersonalNotebook';
import { GrammarLevel } from './types/grammar';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'entrance' | 'rooms' | 'notebook'>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel | null>(null);
  const [savedGrammar, setSavedGrammar] = useState<any[]>([]);

  const handleScreenChange = (screen: 'welcome' | 'entrance' | 'rooms' | 'notebook') => {
    setCurrentScreen(screen);
  };

  const handleLevelSelect = (level: GrammarLevel) => {
    setSelectedLevel(level);
    setCurrentScreen('rooms');
  };

  const handleSaveGrammar = (grammar: any) => {
    setSavedGrammar(prev => [...prev, grammar]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            key="welcome"
            onEnterMuseum={() => handleScreenChange('entrance')} 
          />
        )}
        
        {currentScreen === 'entrance' && (
          <MuseumEntrance 
            key="entrance"
            onLevelSelect={handleLevelSelect}
            onOpenNotebook={() => handleScreenChange('notebook')}
            onBack={() => handleScreenChange('welcome')}
          />
        )}
        
        {currentScreen === 'rooms' && selectedLevel && (
          <GrammarRooms 
            key="rooms"
            level={selectedLevel}
            onBack={() => handleScreenChange('entrance')}
            onSaveGrammar={handleSaveGrammar}
            onOpenNotebook={() => handleScreenChange('notebook')}
          />
        )}
        
        {currentScreen === 'notebook' && (
          <PersonalNotebook 
            key="notebook"
            savedGrammar={savedGrammar}
            onBack={() => handleScreenChange('entrance')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;