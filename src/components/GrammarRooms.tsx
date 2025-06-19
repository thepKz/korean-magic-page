import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Play, Save, Facebook as Notebook, Star, Volume2 } from 'lucide-react';
import { GrammarLevel, GrammarPoint } from '../types/grammar';

interface GrammarRoomsProps {
  level: GrammarLevel;
  onBack: () => void;
  onSaveGrammar: (grammar: GrammarPoint) => void;
  onOpenNotebook: () => void;
}

const GrammarRooms: React.FC<GrammarRoomsProps> = ({ 
  level, 
  onBack, 
  onSaveGrammar, 
  onOpenNotebook 
}) => {
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null);
  const [currentExample, setCurrentExample] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  // Sample grammar data
  const grammarData: Record<GrammarLevel, GrammarPoint[]> = {
    beginner: [
      {
        id: 'be-1',
        korean: '이다/아니다',
        english: 'To be / Not to be',
        structure: 'Noun + 이다/아니다',
        examples: [
          {
            korean: '저는 학생이에요.',
            english: 'I am a student.',
            romanization: 'Jeoneun haksaeng-ieyo.'
          },
          {
            korean: '이것은 책이 아니에요.',
            english: 'This is not a book.',
            romanization: 'Igeoseun chaegi anieyo.'
          }
        ],
        usage: 'Used to state what something is or is not',
        level: 'beginner'
      },
      {
        id: 'be-2',
        korean: '있다/없다',
        english: 'To have / Not to have',
        structure: 'Noun + 이/가 있다/없다',
        examples: [
          {
            korean: '시간이 있어요.',
            english: 'I have time.',
            romanization: 'Sigani isseoyo.'
          },
          {
            korean: '돈이 없어요.',
            english: 'I don\'t have money.',
            romanization: 'Doni eopseoyo.'
          }
        ],
        usage: 'Used to express existence or possession',
        level: 'beginner'
      }
    ],
    intermediate: [
      {
        id: 'int-1',
        korean: 'N 밖에 + 부정',
        english: 'Only / Nothing but',
        structure: 'Noun + 밖에 + negative verb',
        examples: [
          {
            korean: '오빠밖에 사랑하지 않아요.',
            english: 'I only love my older brother.',
            romanization: 'Oppabakke saranghaji anayo.'
          },
          {
            korean: '한국어밖에 할 줄 몰라요.',
            english: 'I only know how to speak Korean.',
            romanization: 'Hangugeobakke hal jul mollayo.'
          }
        ],
        usage: 'Used to express "only" or "nothing but" with negative verbs',
        level: 'intermediate'
      },
      {
        id: 'int-2',
        korean: 'N(이)라고 하다',
        english: 'To be called / To say that',
        structure: 'Noun + (이)라고 하다',
        examples: [
          {
            korean: '한국어를 베트남말로 띠엔 한이라고 해요.',
            english: 'Korean is called "Tieng Han" in Vietnamese.',
            romanization: 'Hangugeoreul beteunamallo ttien hanirago haeyo.'
          },
          {
            korean: '이 음식을 김치라고 해요.',
            english: 'This food is called kimchi.',
            romanization: 'I eumsigeul gimchirago haeyo.'
          }
        ],
        usage: 'Used to say what something is called or to quote what someone said',
        level: 'intermediate'
      },
      {
        id: 'int-3',
        korean: 'V게 되다',
        english: 'To come to / To end up',
        structure: 'Verb stem + 게 되다',
        examples: [
          {
            korean: '이번 학기에 장학금을 받게 되었어요.',
            english: 'I came to receive a scholarship this semester.',
            romanization: 'Ibeon hakgie janghakgeumeul batge doeeosseoyo.'
          },
          {
            korean: '한국에서 살게 되었어요.',
            english: 'I ended up living in Korea.',
            romanization: 'Hangugeseo salge doeeosseoyo.'
          }
        ],
        usage: 'Used to express a change in situation or state that happened naturally',
        level: 'intermediate'
      },
      {
        id: 'int-4',
        korean: 'V(으)ㄹ 생각이다',
        english: 'To plan to / To intend to',
        structure: 'Verb stem + (으)ㄹ 생각이다',
        examples: [
          {
            korean: '유학할 생각이에요.',
            english: 'I plan to study abroad.',
            romanization: 'Yuhakhal saenggagieyo.'
          },
          {
            korean: '내년에 결혼할 생각이에요.',
            english: 'I plan to get married next year.',
            romanization: 'Naenyeone gyeolhonhal saenggagieyo.'
          }
        ],
        usage: 'Used to express plans or intentions',
        level: 'intermediate'
      },
      {
        id: 'int-5',
        korean: 'V는 길이다/길에',
        english: 'On the way to',
        structure: 'Verb stem + 는 길이다/길에',
        examples: [
          {
            korean: '밥을 먹으러 가는 길이에요.',
            english: 'I\'m on my way to eat.',
            romanization: 'Babeul meogeuro ganeun girieyo.'
          },
          {
            korean: '집에 가는 길에 마트에 들렀어요.',
            english: 'I stopped by the mart on my way home.',
            romanization: 'Jibe ganeun gire mateue deulleosseoyo.'
          }
        ],
        usage: 'Used to express being on the way to do something',
        level: 'intermediate'
      },
      {
        id: 'int-6',
        korean: 'V(으)ㄴ/N 덕분에',
        english: 'Thanks to / Because of',
        structure: 'Verb/Noun + 덕분에',
        examples: [
          {
            korean: '열심히 공부한 덕분에 한국어 실력이 좋아졌어요.',
            english: 'Thanks to studying hard, my Korean skills improved.',
            romanization: 'Yeolsimhi gongbuhan deokbune hangugeo sillyeogi joajyeosseoyo.'
          },
          {
            korean: '선생님 덕분에 시험에 합격했어요.',
            english: 'Thanks to my teacher, I passed the exam.',
            romanization: 'Seonsaengnim deokbune siheome hapgyeokhaesseoyo.'
          }
        ],
        usage: 'Used to express gratitude or positive causation',
        level: 'intermediate'
      },
      {
        id: 'int-7',
        korean: 'V나요?/A(으)ㄴ가요?',
        english: 'Polite question ending',
        structure: 'Verb + 나요? / Adjective + (으)ㄴ가요?',
        examples: [
          {
            korean: '운동하나요?',
            english: 'Do you exercise?',
            romanization: 'Undonghanayor?'
          },
          {
            korean: '바쁜가요?',
            english: 'Are you busy?',
            romanization: 'Bappeungayo?'
          }
        ],
        usage: 'Polite and respectful way to ask questions',
        level: 'intermediate'
      },
      {
        id: 'int-8',
        korean: 'V는 게 좋다',
        english: 'It\'s better to',
        structure: 'Verb stem + 는 게 좋다',
        examples: [
          {
            korean: '일찍 자는 게 좋겠어요.',
            english: 'It would be better to sleep early.',
            romanization: 'Iljjik janeun ge jokesseoyo.'
          },
          {
            korean: '미리 준비하는 게 좋아요.',
            english: 'It\'s better to prepare in advance.',
            romanization: 'Miri junbihaneun ge joayo.'
          }
        ],
        usage: 'Used to give advice or express what would be better',
        level: 'intermediate'
      },
      {
        id: 'int-9',
        korean: 'A아/어 보이다',
        english: 'To look / To seem',
        structure: 'Adjective stem + 아/어 보이다',
        examples: [
          {
            korean: '요즘 날씬해 보여요.',
            english: 'You look slim these days.',
            romanization: 'Yojeum nalssinhae boyeoyo.'
          },
          {
            korean: '피곤해 보여요.',
            english: 'You look tired.',
            romanization: 'Pigonhae boyeoyo.'
          }
        ],
        usage: 'Used to express how something appears or looks',
        level: 'intermediate'
      },
      {
        id: 'int-10',
        korean: 'V는/A(으)ㄴ 것 같다',
        english: 'It seems like / I think',
        structure: 'Verb/Adjective + 것 같다',
        examples: [
          {
            korean: '한국어가 어려운 것 같아요.',
            english: 'Korean seems difficult.',
            romanization: 'Hangugeoga eoryeoun geot gatayo.'
          },
          {
            korean: '비가 오는 것 같아요.',
            english: 'It seems like it\'s raining.',
            romanization: 'Biga oneun geot gatayo.'
          }
        ],
        usage: 'Used to express assumption or probability',
        level: 'intermediate'
      }
    ],
    advanced: [
      {
        id: 'adv-1',
        korean: '-(으)ㄴ/는 바에야',
        english: 'If one is going to do / Rather than',
        structure: 'Verb stem + (으)ㄴ/는 바에야',
        examples: [
          {
            korean: '하는 바에야 제대로 하자.',
            english: 'If we\'re going to do it, let\'s do it properly.',
            romanization: 'Haneun baeya jedaero haja.'
          }
        ],
        usage: 'Used to express determination or preference',
        level: 'advanced'
      }
    ]
  };

  const currentGrammarPoints = grammarData[level];

  const levelInfo = {
    beginner: {
      korean: '초급관',
      english: 'Beginner Hall',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-500/20',
      emoji: '🌱'
    },
    intermediate: {
      korean: '중급관',
      english: 'Intermediate Hall',
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-500/20',
      emoji: '⚡'
    },
    advanced: {
      korean: '고급관',
      english: 'Advanced Hall',
      color: 'from-purple-400 to-pink-600',
      bgColor: 'bg-purple-500/20',
      emoji: '👑'
    }
  };

  const handleGrammarSelect = (grammar: GrammarPoint) => {
    setSelectedGrammar(grammar);
    setCurrentExample(0);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const handleSave = (grammar: GrammarPoint) => {
    onSaveGrammar(grammar);
    // Show success animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const playExample = () => {
    // In a real app, this would use text-to-speech
    console.log('Playing audio for:', selectedGrammar?.examples[currentExample].korean);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
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
          <span className="korean-text">전시관으로</span>
        </motion.button>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNotebook}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
          >
            <Notebook className="w-5 h-5" />
            <span className="korean-text">노트</span>
          </motion.button>
        </div>
      </div>

      {/* Room Title */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-4xl">{levelInfo[level].emoji}</span>
          <h1 className="text-3xl md:text-5xl font-bold korean-text text-white">
            {levelInfo[level].korean}
          </h1>
        </div>
        <p className="text-xl english-text text-blue-200">
          {levelInfo[level].english}
        </p>
        {level === 'intermediate' && (
          <p className="text-sm korean-text text-blue-300 mt-2">
            TOPIK 3급 문법 및 어휘 전시관
          </p>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grammar Points List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold korean-text text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            문법 전시품
          </h2>
          
          <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-2">
            {currentGrammarPoints.map((grammar, index) => (
              <motion.div
                key={grammar.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => handleGrammarSelect(grammar)}
                className={`${levelInfo[level].bgColor} border border-white/20 rounded-xl p-6 cursor-pointer backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 group ${
                  selectedGrammar?.id === grammar.id ? 'ring-2 ring-white/50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold korean-text text-white mb-2 group-hover:scale-105 transition-transform">
                      {grammar.korean}
                    </h3>
                    <p className="english-text text-blue-200 mb-2">
                      {grammar.english}
                    </p>
                    <p className="text-sm text-white/60 font-mono">
                      {grammar.structure}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl"
                  >
                    🎨
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grammar Detail Panel */}
        <div className="lg:sticky lg:top-4">
          <AnimatePresence mode="wait">
            {selectedGrammar ? (
              <motion.div
                key={selectedGrammar.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                {/* Grammar Title */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold korean-text text-white mb-2">
                      {selectedGrammar.korean}
                    </h3>
                    <p className="english-text text-blue-200">
                      {selectedGrammar.english}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(selectedGrammar)}
                    className="bg-korean-red/20 hover:bg-korean-red/30 p-3 rounded-full border border-korean-red/50 transition-colors"
                  >
                    <Save className="w-5 h-5 text-korean-red" />
                  </motion.button>
                </div>

                {/* Structure */}
                <div className="mb-6">
                  <h4 className="korean-text text-white font-semibold mb-2">구조:</h4>
                  <p className="font-mono text-yellow-300 bg-black/20 p-3 rounded-lg">
                    {selectedGrammar.structure}
                  </p>
                </div>

                {/* Usage */}
                <div className="mb-6">
                  <h4 className="korean-text text-white font-semibold mb-2">사용법:</h4>
                  <p className="text-blue-200">
                    {selectedGrammar.usage}
                  </p>
                </div>

                {/* Examples */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="korean-text text-white font-semibold">예문:</h4>
                    <div className="flex gap-2">
                      {selectedGrammar.examples.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentExample(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            currentExample === index ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentExample}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-black/20 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <p className="korean-text text-white text-lg font-medium">
                          {selectedGrammar.examples[currentExample].korean}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={playExample}
                          className="text-blue-300 hover:text-blue-200 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <p className="english-text text-blue-200 mb-2">
                        {selectedGrammar.examples[currentExample].english}
                      </p>
                      <p className="text-sm text-white/60 font-mono">
                        {selectedGrammar.examples[currentExample].romanization}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Elements */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playExample}
                    className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/50 text-blue-300 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span className="korean-text">발음 듣기</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 px-4 py-2 rounded-lg border border-yellow-400/50 text-yellow-300 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span className="korean-text">퀴즈</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="korean-text text-white text-xl mb-2">
                  전시품을 선택해주세요
                </h3>
                <p className="english-text text-blue-300">
                  Select an exhibition piece to explore
                </p>
                {level === 'intermediate' && (
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <p className="korean-text text-blue-200 text-sm">
                      💡 TOPIK 3급 수준의 문법과 어휘를 학습할 수 있습니다
                    </p>
                    <p className="english-text text-blue-300 text-xs mt-1">
                      Learn TOPIK Level 3 grammar and vocabulary
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-korean-red/90 backdrop-blur-sm rounded-full p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-4xl text-white"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GrammarRooms;