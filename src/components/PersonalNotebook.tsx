import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Book, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrammarPoint } from '../types/grammar';

interface PersonalNotebookProps {
  savedGrammar: GrammarPoint[];
}

const PersonalNotebook: React.FC<PersonalNotebookProps> = ({ savedGrammar }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Dummy data for now - replace with actual data fetching based on savedGrammar ids
  const grammarDetails = {
    'int-1': { 
      korean: 'N 밖에 + 부정', 
      english: 'Only / Nothing but', 
      structure: 'Noun + 밖에 + negative verb',
      usage: 'Used to express "only" or "nothing but" with negative verbs' 
    },
    'int-2': { 
      korean: 'N(이)라고 하다', 
      english: 'To be called / To say that',
      structure: 'Noun + (이)라고 하다',
      usage: 'Used to say what something is called or to quote what someone said'
    },
     // ... add other grammar details
  };

  const notebookItems = savedGrammar.map(id => grammarDetails[id as keyof typeof grammarDetails]).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="min-h-screen bg-gray-900/50 p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="korean-text">돌아가기</span>
          </motion.button>
          
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white korean-text">개인 노트</h1>
          </div>

          <div className="w-20"></div>
        </div>

        {/* Notebook Content */}
        <div className="space-y-4">
          <AnimatePresence>
            {notebookItems.length > 0 ? (
              notebookItems.map((item, index) => (
                <motion.div
                  key={item.korean}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  exit={{ opacity: 0 }}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden"
                >
                  <button
                    onClick={() => setExpanded(expanded === item.korean ? null : item.korean)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-blue-300 font-bold">{index + 1}.</span>
                      <h2 className="text-lg text-white font-medium korean-text">{item.korean}</h2>
                      <p className="text-gray-400 hidden md:block">- {item.english}</p>
                    </div>
                    <motion.div animate={{ rotate: expanded === item.korean ? 90 : 0 }}>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expanded === item.korean && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-4"
                      >
                        <div className="border-t border-white/20 pt-4">
                          <p className="text-gray-300 mb-2"><strong className="text-white">Structure:</strong> {item.structure}</p>
                          <p className="text-gray-300"><strong className="text-white">Usage:</strong> {item.usage}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Book className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl text-white korean-text mb-2">노트가 비어있습니다</h3>
                <p className="text-gray-400 mb-6">문법을 저장하여 나만의 노트를 만들어보세요.</p>
                <Link to="/entrance">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                  >
                    문법 배우러 가기
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalNotebook;