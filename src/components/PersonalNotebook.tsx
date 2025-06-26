import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Book, ChevronRight, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrammarPoint } from '../types/grammar';
import { localizeField } from '../utils/localize';

interface PersonalNotebookProps {
  savedGrammar: GrammarPoint[];
}

const PersonalNotebook: React.FC<PersonalNotebookProps> = ({ savedGrammar }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

  // Normalize savedGrammar in case items are wrapped in { grammarId }
  const notebookItems: GrammarPoint[] = savedGrammar.map((item: any) => {
    if (!item) return null;
    return 'korean' in item ? item as GrammarPoint : (item.grammarId as GrammarPoint);
  }).filter(Boolean) as GrammarPoint[];

  // Fetch detail when expanded grammar lacks info
  useEffect(() => {
    const loadDetail = async () => {
      if (!expanded) return;
      const gp = notebookItems.find(i => i.korean === expanded);
      if (!gp || (gp.structure && gp.usage)) return;
      try {
        setLoadingDetailId(gp._id);
        const res = await fetch(`${API_URL}/grammar/${gp._id}`);
        if (res.ok) {
          const data = await res.json();
          Object.assign(gp, data); // mutate local item
        }
      } catch (e) {
        console.error('Load grammar detail error', e);
      } finally {
        setLoadingDetailId(null);
      }
    };
    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

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
                      <p className="text-gray-400 hidden md:block">- {localizeField(item,'english','vietnamese')}</p>
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
                          <p className="text-gray-300 mb-2"><strong className="text-white">Structure:</strong> {item.structure || (loadingDetailId === item._id ? <Loader className="inline animate-spin" size={16}/> : '-')}</p>
                          <p className="text-gray-300"><strong className="text-white">Usage:</strong> {localizeField(item,'usage','usageVi') || (loadingDetailId === item._id ? <Loader className="inline animate-spin" size={16}/> : '-')}</p>
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