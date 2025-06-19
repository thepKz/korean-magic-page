import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Trash2, Star, Search } from 'lucide-react';
import { GrammarPoint } from '../types/grammar';

interface PersonalNotebookProps {
  savedGrammar: GrammarPoint[];
  onBack: () => void;
}

const PersonalNotebook: React.FC<PersonalNotebookProps> = ({ 
  savedGrammar, 
  onBack 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredGrammar = savedGrammar.filter(grammar =>
    grammar.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grammar.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredGrammar.length / itemsPerPage);
  const currentItems = filteredGrammar.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="korean-text">돌아가기</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-white" />
          <h1 className="text-2xl font-bold korean-text text-white">
            개인 노트북
          </h1>
        </div>
      </div>

      {/* Notebook Container */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fef7cd 0%, #fde68a 50%, #f59e0b 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Notebook Binding */}
          <div className="flex">
            <div className="w-16 bg-gradient-to-b from-red-600 to-red-800 flex flex-col items-center py-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-yellow-300 rounded-full shadow-inner" />
              ))}
            </div>

            {/* Notebook Content */}
            <div className="flex-1 p-8">
              {/* Notebook Header */}
              <div className="border-b-2 border-red-300 pb-6 mb-8">
                <h2 className="text-3xl font-bold korean-text text-red-800 mb-2">
                  나의 문법 노트
                </h2>
                <p className="english-text text-red-600">
                  My Grammar Notebook
                </p>
                
                {/* Search Bar */}
                <div className="mt-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    placeholder="문법 검색... (Search grammar...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border-2 border-red-200 rounded-lg focus:border-red-400 focus:outline-none korean-text"
                  />
                </div>
              </div>

              {/* Content */}
              {savedGrammar.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="korean-text text-red-700 text-xl mb-2">
                    아직 저장된 문법이 없습니다
                  </h3>
                  <p className="english-text text-red-500">
                    No saved grammar points yet
                  </p>
                  <p className="korean-text text-red-600 mt-4">
                    전시관에서 문법을 저장해보세요!
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Grammar Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <AnimatePresence mode="popLayout">
                      {currentItems.map((grammar, index) => (
                        <motion.div
                          key={grammar.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                          transition={{ 
                            duration: 0.3,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 5,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                          }}
                          onClick={() => setSelectedGrammar(grammar)}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 cursor-pointer border-2 border-red-200 hover:border-red-400 transition-all duration-300 group"
                        >
                          {/* Level Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              grammar.level === 'beginner' ? 'bg-green-200 text-green-800' :
                              grammar.level === 'intermediate' ? 'bg-blue-200 text-blue-800' :
                              'bg-purple-200 text-purple-800'
                            }`}>
                              {grammar.level === 'beginner' ? '초급' :
                               grammar.level === 'intermediate' ? '중급' : '고급'}
                            </span>
                            <Star className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                          </div>

                          {/* Grammar Content */}
                          <h4 className="korean-text text-red-800 font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                            {grammar.korean}
                          </h4>
                          <p className="english-text text-red-600 mb-3">
                            {grammar.english}
                          </p>
                          <p className="text-sm text-red-500 font-mono bg-red-50 p-2 rounded">
                            {grammar.structure}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentPage(index)}
                          className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                            currentPage === index
                              ? 'bg-red-600 text-white'
                              : 'bg-red-200 text-red-600 hover:bg-red-300'
                          }`}
                        >
                          {index + 1}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grammar Detail Modal */}
      <AnimatePresence>
        {selectedGrammar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedGrammar(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="korean-text text-2xl font-bold text-red-800">
                  {selectedGrammar.korean}
                </h3>
                <button
                  onClick={() => setSelectedGrammar(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="korean-text font-semibold text-red-700 mb-2">영어:</h4>
                  <p className="english-text text-red-600">{selectedGrammar.english}</p>
                </div>

                <div>
                  <h4 className="korean-text font-semibold text-red-700 mb-2">구조:</h4>
                  <p className="font-mono bg-red-50 p-3 rounded text-red-800">
                    {selectedGrammar.structure}
                  </p>
                </div>

                <div>
                  <h4 className="korean-text font-semibold text-red-700 mb-2">사용법:</h4>
                  <p className="text-red-600">{selectedGrammar.usage}</p>
                </div>

                <div>
                  <h4 className="korean-text font-semibold text-red-700 mb-2">예문:</h4>
                  <div className="space-y-3">
                    {selectedGrammar.examples.map((example, index) => (
                      <div key={index} className="bg-red-50 p-4 rounded-lg">
                        <p className="korean-text font-medium text-red-800 mb-1">
                          {example.korean}
                        </p>
                        <p className="english-text text-red-600 mb-1">
                          {example.english}
                        </p>
                        <p className="text-sm text-red-500 font-mono">
                          {example.romanization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PersonalNotebook;