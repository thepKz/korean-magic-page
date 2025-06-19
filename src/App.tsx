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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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