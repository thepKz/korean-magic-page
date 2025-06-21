import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader, Save, Search, Sparkles, Volume2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import { GrammarPoint } from '../types/grammar';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

interface GrammarRoomsProps {
  onSaveGrammar: (grammar: GrammarPoint) => void;
}

const GrammarRooms: React.FC<GrammarRoomsProps> = ({ onSaveGrammar }) => {
  const { t } = useTranslation();
  const { level } = useParams<{ level: string }>();
  const { token } = useAuth();

  const [grammarPoints, setGrammarPoints] = useState<GrammarPoint[]>([]);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const fetchGrammar = useCallback(async () => {
    if (!level) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/grammar?level=${level}`);
      if (!response.ok) throw new Error('Failed to fetch grammar points.');
      const data = await response.json();
      if (data && Array.isArray(data.grammar)) {
        setGrammarPoints(data.grammar);
        if (data.grammar.length > 0) {
            setSelectedGrammar(data.grammar[0]);
            setAiExplanation(null);
        }
      } else {
        setGrammarPoints([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [level]);

  useEffect(() => {
    fetchGrammar();
  }, [fetchGrammar]);
  
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSave = async () => {
    if (!selectedGrammar) return;
    setIsSaving(true);
    await onSaveGrammar(selectedGrammar);
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSelectGrammar = (grammar: GrammarPoint) => {
    setSelectedGrammar(grammar);
    setAiExplanation(null);
  };

  const handleExplainWithAi = async () => {
    if (!selectedGrammar) return;
    if (!token) {
      alert(t('auth.login') + ' / ' + t('auth.register') + ' ' + t('common.required'));
      return;
    }
    setIsGenerating(true);
    setAiExplanation(null);
    try {
      const response = await fetch(`${API_URL}/ai/explain-grammar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          grammarPoint: selectedGrammar.korean,
          currentExplanation: selectedGrammar.english,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate AI explanation.');
      }

      const data = await response.json();
      setAiExplanation(data.explanation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const filteredPoints = grammarPoints.filter(p => 
    p.korean.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] gap-6">
      {/* Grammar List Panel */}
      <div className="md:w-1/3 flex flex-col bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <div className="relative mb-4 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('rooms.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-cyan-500 focus:outline-none text-white transition-colors"
            />
        </div>
        <div className="overflow-y-auto flex-grow pr-2">
            {isLoading && <p className="text-center text-gray-400">{t('common.loading')}</p>}
            {error && <p className="text-center text-red-400">{error}</p>}
            <AnimatePresence>
              {filteredPoints.map((gp) => (
                <motion.div
                  key={gp._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => handleSelectGrammar(gp)}
                  className={`p-4 rounded-lg mb-2 cursor-pointer transition-colors border ${selectedGrammar?._id === gp._id ? 'bg-cyan-500/20 border-cyan-500' : 'bg-gray-700/50 hover:bg-gray-600/50 border-transparent'}`}
                >
                  <h3 className="font-bold text-white korean-text text-lg">{gp.korean}</h3>
                  <p className="text-sm text-gray-400">{gp.english}</p>
                </motion.div>
              ))}
            </AnimatePresence>
        </div>
      </div>

      {/* Details Panel */}
      <div className="md:w-2/3 flex flex-col bg-gray-800/50 p-6 rounded-lg border border-gray-700 overflow-y-auto">
        {selectedGrammar ? (
          <AnimatePresence mode="wait">
            <motion.div
                key={selectedGrammar._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex flex-col h-full"
            >
              <div className="flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white korean-text">{selectedGrammar.korean}</h2>
                        <p className="text-md text-gray-400">{selectedGrammar.english}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleExplainWithAi}
                        disabled={isGenerating}
                        className="relative group p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/40 disabled:opacity-50 disabled:cursor-wait">
                        {isGenerating ? <Loader size={20} className="animate-spin" /> : <Sparkles size={20} />}
                        <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -translate-x-1/2 left-1/2">
                          {t('grammar.explain_with_ai')}
                        </span>
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={isSaving || isSaved}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-2 px-3 ${isSaved ? 'bg-green-500/30 text-green-300' : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 disabled:opacity-50'}`}>
                          {isSaving ? <Loader size={20} className="animate-spin" /> : (isSaved ? <Check size={20} /> : <Save size={20} />)}
                          <span className="text-sm font-medium">{isSaving ? t('common.loading') : (isSaved ? t('common.saved') : t('common.save'))}</span>
                      </button>
                    </div>
                </div>

                {/* AI Explanation Section */}
                {isGenerating && (
                    <div className="p-4 bg-gray-900/50 rounded-lg text-center text-gray-400">
                      <Loader className="animate-spin inline-block mr-2" />
                      AI đang soạn giải thích...
                    </div>
                )}
                {aiExplanation && (
                    <motion.div 
                      initial={{ opacity: 0, y:10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="prose prose-invert max-w-none text-gray-300 p-4 bg-gray-900/50 rounded-lg mb-6 border border-blue-500/30"
                    >
                      <p dangerouslySetInnerHTML={{ __html: (aiExplanation ?? '').replace(/\n/g, '<br />') }} />
                    </motion.div>
                )}

                {/* Original Explanation */}
                {selectedGrammar.explanation ? (
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <p dangerouslySetInnerHTML={{ __html: (selectedGrammar.explanation ?? '').replace(/\n/g, '<br />') }} />
                  </div>
                ) : (
                  <p className="text-gray-400 italic">{t('grammar.explanation_placeholder')}</p>
                )}
                
                {/* Examples */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4 korean-text">Ví dụ</h3>
                    {selectedGrammar.examples.map((ex, index) => (
                        <div key={index} className="mb-4 bg-gray-900/50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="korean-text text-lg text-cyan-300">{ex.korean}</p>
                                <button onClick={() => handleSpeak(ex.korean)} className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                                    <Volume2 size={20} />
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{ex.english}</p>
                        </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a grammar point to see the details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarRooms;