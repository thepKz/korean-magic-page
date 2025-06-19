import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Save, Volume2, ChevronLeft, ChevronRight, Target, Shuffle, Edit3 } from 'lucide-react';
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
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  // Complete TOPIK 3 grammar data
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
            korean: '운동하나요? 바쁜가요? 의사인가요?',
            english: 'Do you exercise? Are you busy? Are you a doctor?',
            romanization: 'Undonghanayor? Bappeungayo? Uisaingayo?'
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
          }
        ],
        usage: 'Used to express assumption or probability',
        level: 'intermediate'
      },
      {
        id: 'int-11',
        korean: 'V는/A(으)ㄴ N 대신(에)',
        english: 'Instead of',
        structure: 'Verb/Adjective + N + 대신(에)',
        examples: [
          {
            korean: '밥 대신 쌀국수를 먹읍시다.',
            english: 'Let\'s eat rice noodles instead of rice.',
            romanization: 'Bap daesin ssalguksureul meogeupsida.'
          }
        ],
        usage: 'Used to express substitution or replacement',
        level: 'intermediate'
      },
      {
        id: 'int-12',
        korean: 'V/A기는 하다',
        english: 'It is true that... but',
        structure: 'Verb/Adjective + 기는 하다',
        examples: [
          {
            korean: '예쁘기는 하지만 비싸요.',
            english: 'It is pretty, but it\'s expensive.',
            romanization: 'Yeppeugineun hajiman bissayo.'
          }
        ],
        usage: 'Used to acknowledge something while introducing a contrasting point',
        level: 'intermediate'
      },
      {
        id: 'int-13',
        korean: 'V고 나서',
        english: 'After doing',
        structure: 'Verb stem + 고 나서',
        examples: [
          {
            korean: '고기를 썰고 나서 볶아요.',
            english: 'After cutting the meat, stir-fry it.',
            romanization: 'Gogireul sseolgo naseo bokkayo.'
          }
        ],
        usage: 'Used to express sequence of actions',
        level: 'intermediate'
      },
      {
        id: 'int-14',
        korean: '(으)로',
        english: 'With / By means of',
        structure: 'Noun + (으)로',
        examples: [
          {
            korean: '삼계탕은 닭고기와 인삼으로 만들어요.',
            english: 'Samgyetang is made with chicken and ginseng.',
            romanization: 'Samgyetangeun dakgogiwa insameullo mandeureoyo.'
          }
        ],
        usage: 'Used to express means, method, or material',
        level: 'intermediate'
      },
      {
        id: 'int-15',
        korean: 'V다가',
        english: 'While doing... then',
        structure: 'Verb stem + 다가',
        examples: [
          {
            korean: '자다가 전화가 왔어요.',
            english: 'While sleeping, a phone call came.',
            romanization: 'Jadaga jeonhwaga wasseoyo.'
          }
        ],
        usage: 'Used to express interruption of an ongoing action',
        level: 'intermediate'
      },
      {
        id: 'int-16',
        korean: 'A게 + V',
        english: 'In a ... manner',
        structure: 'Adjective stem + 게 + Verb',
        examples: [
          {
            korean: '맛있게 먹다, 예쁘게 입다',
            english: 'To eat deliciously, to dress prettily',
            romanization: 'Masitge meokda, yeppeuge ipda'
          }
        ],
        usage: 'Used to express manner or way of doing something',
        level: 'intermediate'
      },
      {
        id: 'int-17',
        korean: 'V기 쉽다',
        english: 'Easy to do',
        structure: 'Verb stem + 기 쉽다',
        examples: [
          {
            korean: '비밀번호는 잊어버리기 쉬우니까 메모하세요.',
            english: 'Passwords are easy to forget, so write them down.',
            romanization: 'Bimilbeonhoneun ijeobeoigi swiunikka memohaseyo.'
          }
        ],
        usage: 'Used to express that something is easy to do',
        level: 'intermediate'
      },
      {
        id: 'int-18',
        korean: 'V는 동안',
        english: 'While / During',
        structure: 'Verb stem + 는 동안',
        examples: [
          {
            korean: '서울에 사는 동안 광화문에 가 봤어요.',
            english: 'While living in Seoul, I went to Gwanghwamun.',
            romanization: 'Seoure saneun dongan gwanghwamune ga bwasseoyo.'
          }
        ],
        usage: 'Used to express duration or simultaneous actions',
        level: 'intermediate'
      },
      {
        id: 'int-19',
        korean: 'V(으)려면',
        english: 'If you want to / In order to',
        structure: 'Verb stem + (으)려면',
        examples: [
          {
            korean: '환불하려면 사용하지 마세요.',
            english: 'If you want a refund, don\'t use it.',
            romanization: 'Hwanbulharyeomyeon sayonghaji maseyo.'
          }
        ],
        usage: 'Used to express conditions for achieving a goal',
        level: 'intermediate'
      },
      {
        id: 'int-20',
        korean: 'N처럼',
        english: 'Like / As',
        structure: 'Noun + 처럼',
        examples: [
          {
            korean: '가수처럼 노래 잘하고 싶어요.',
            english: 'I want to sing well like a singer.',
            romanization: 'Gasucheoreom norae jalhago sipeoyo.'
          }
        ],
        usage: 'Used to make comparisons or express similarity',
        level: 'intermediate'
      },
      // Adding more TOPIK 3 grammar points
      {
        id: 'int-21',
        korean: 'V는군요/A군요',
        english: 'Oh, I see / So that\'s how it is',
        structure: 'Verb/Adjective + 군요',
        examples: [
          {
            korean: '잘 준비하는군요.',
            english: 'Oh, I see you\'re preparing well.',
            romanization: 'Jal junbihaneun-gunyo.'
          }
        ],
        usage: 'Used to express realization or discovery',
        level: 'intermediate'
      },
      {
        id: 'int-22',
        korean: 'V는/A(으)ㄴ 편이다',
        english: 'To be on the ... side / Rather',
        structure: 'Verb/Adjective + 편이다',
        examples: [
          {
            korean: '말이 많고 적극적인 편이에요.',
            english: 'I\'m rather talkative and active.',
            romanization: 'Mari manko jeokgeukjeogin pyeonieyo.'
          }
        ],
        usage: 'Used to express tendency or general characteristic',
        level: 'intermediate'
      },
      {
        id: 'int-23',
        korean: 'V는 바람에',
        english: 'Because of / Due to',
        structure: 'Verb stem + 는 바람에',
        examples: [
          {
            korean: '늦게 일어나는 바람에 버스를 놓쳤어요.',
            english: 'I missed the bus because I woke up late.',
            romanization: 'Neutge ireonaneun barame beoseureul nochyeosseoyo.'
          }
        ],
        usage: 'Used to express an unintended negative result',
        level: 'intermediate'
      },
      {
        id: 'int-24',
        korean: 'V는 중에/중이다',
        english: 'In the middle of / During',
        structure: 'Verb stem + 는 중에/중이다',
        examples: [
          {
            korean: '시험 보는 중에 전화가 왔어요.',
            english: 'A phone call came during the exam.',
            romanization: 'Siheom boneun junge jeonhwaga wasseoyo.'
          }
        ],
        usage: 'Used to express ongoing action or state',
        level: 'intermediate'
      },
      {
        id: 'int-25',
        korean: 'V도록 하다',
        english: 'To make sure to / To see to it that',
        structure: 'Verb stem + 도록 하다',
        examples: [
          {
            korean: '내일 늦지 않도록 하겠어요.',
            english: 'I\'ll make sure not to be late tomorrow.',
            romanization: 'Naeil neutji andorok hagesseoyo.'
          }
        ],
        usage: 'Used to express intention or determination',
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
    beginner: { korean: '초급', english: 'Beginner' },
    intermediate: { korean: '중급', english: 'Intermediate' },
    advanced: { korean: '고급', english: 'Advanced' }
  };

  const handleGrammarSelect = (grammar: GrammarPoint) => {
    setSelectedGrammar(grammar);
    setCurrentExample(0);
    setShowQuiz(false);
    setQuizResult(null);
    setQuizAnswer('');
  };

  const handleSave = (grammar: GrammarPoint) => {
    onSaveGrammar(grammar);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  const handleNotebookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenNotebook();
  };

  const nextExample = () => {
    if (selectedGrammar && currentExample < selectedGrammar.examples.length - 1) {
      setCurrentExample(currentExample + 1);
    }
  };

  const prevExample = () => {
    if (currentExample > 0) {
      setCurrentExample(currentExample - 1);
    }
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizAnswer('');
    setQuizResult(null);
  };

  const checkQuizAnswer = () => {
    if (!selectedGrammar) return;
    
    const correctAnswer = selectedGrammar.examples[currentExample].korean;
    const isCorrect = quizAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    setQuizResult(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      setQuizResult(null);
      setQuizAnswer('');
      setShowQuiz(false);
    }, 2000);
  };

  const getRandomGrammar = () => {
    const randomIndex = Math.floor(Math.random() * currentGrammarPoints.length);
    handleGrammarSelect(currentGrammarPoints[randomIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="korean-text">돌아가기</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-2xl font-light korean-text text-white">
            {levelInfo[level].korean}
          </h1>
          <p className="text-sm english-text text-gray-400">
            {levelInfo[level].english}
            {level === 'intermediate' && ' • TOPIK 3급'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getRandomGrammar}
            className="flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-400/20 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span className="korean-text text-sm">랜덤</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotebookClick}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span className="korean-text">노트</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Grammar List */}
        <div className="lg:col-span-2">
          <div className="max-h-[75vh] overflow-y-auto space-y-3 pr-2">
            {currentGrammarPoints.map((grammar, index) => (
              <motion.div
                key={grammar.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ x: 5 }}
                onClick={() => handleGrammarSelect(grammar)}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedGrammar?.id === grammar.id ? 'border-white/30 bg-white/10' : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="korean-text text-white font-medium mb-1">
                      {grammar.korean}
                    </h3>
                    <p className="english-text text-gray-400 text-sm">
                      {grammar.english}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    #{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grammar Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedGrammar ? (
              <motion.div
                key={selectedGrammar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-light korean-text text-white mb-2">
                      {selectedGrammar.korean}
                    </h2>
                    <p className="english-text text-gray-300 text-lg">
                      {selectedGrammar.english}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(selectedGrammar)}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-colors"
                  >
                    <Save className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* Structure */}
                <div className="mb-8">
                  <h3 className="korean-text text-white font-medium mb-3">구조</h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <code className="text-yellow-300 font-mono">
                      {selectedGrammar.structure}
                    </code>
                  </div>
                </div>

                {/* Usage */}
                <div className="mb-8">
                  <h3 className="korean-text text-white font-medium mb-3">사용법</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedGrammar.usage}
                  </p>
                </div>

                {/* Examples */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="korean-text text-white font-medium">예문</h3>
                    {selectedGrammar.examples.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevExample}
                          disabled={currentExample === 0}
                          className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-400">
                          {currentExample + 1} / {selectedGrammar.examples.length}
                        </span>
                        <button
                          onClick={nextExample}
                          disabled={currentExample === selectedGrammar.examples.length - 1}
                          className="p-1 rounded text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentExample}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-black/20 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <p className="korean-text text-white text-xl font-medium leading-relaxed">
                          {selectedGrammar.examples[currentExample].korean}
                        </p>
                        <button className="text-gray-400 hover:text-white transition-colors ml-4">
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="english-text text-gray-300 mb-2 text-lg">
                        {selectedGrammar.examples[currentExample].english}
                      </p>
                      <p className="text-gray-500 font-mono text-sm">
                        {selectedGrammar.examples[currentExample].romanization}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Interactive Features */}
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startQuiz}
                    className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-400/20 text-blue-300 transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    <span className="korean-text">퀴즈</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 px-4 py-2 rounded-lg border border-green-400/20 text-green-300 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="korean-text">발음</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-2 rounded-lg border border-orange-400/20 text-orange-300 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="korean-text">문장 만들기</span>
                  </motion.button>
                </div>

                {/* Quiz Mode */}
                <AnimatePresence>
                  {showQuiz && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-8 bg-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-400/20"
                    >
                      <h4 className="korean-text text-white font-medium mb-4">
                        퀴즈: 다음 문장을 한국어로 번역하세요
                      </h4>
                      <p className="english-text text-blue-200 mb-4">
                        {selectedGrammar.examples[currentExample].english}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={quizAnswer}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          placeholder="한국어로 입력하세요..."
                          className="flex-1 bg-black/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && checkQuizAnswer()}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={checkQuizAnswer}
                          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white transition-colors"
                        >
                          확인
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {quizResult && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`mt-4 p-4 rounded-lg ${
                              quizResult === 'correct' 
                                ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                                : 'bg-red-500/20 border border-red-400/30 text-red-300'
                            }`}
                          >
                            {quizResult === 'correct' ? (
                              <div>
                                <p className="korean-text font-medium">정답입니다! 🎉</p>
                                <p className="english-text text-sm">Correct!</p>
                              </div>
                            ) : (
                              <div>
                                <p className="korean-text font-medium">틀렸습니다. 정답: {selectedGrammar.examples[currentExample].korean}</p>
                                <p className="english-text text-sm">Incorrect. Try again!</p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center"
              >
                <div className="text-gray-500 mb-4">
                  <BookOpen className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="korean-text text-white text-xl mb-2">
                  문법을 선택하세요
                </h3>
                <p className="english-text text-gray-400 mb-6">
                  Select a grammar point to study
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{currentGrammarPoints.length}</div>
                    <div className="text-sm text-gray-400 korean-text">총 문법</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-400">0</div>
                    <div className="text-sm text-gray-400 korean-text">학습 완료</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">0</div>
                    <div className="text-sm text-gray-400 korean-text">저장됨</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Save Success Animation */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-8 right-8 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <p className="korean-text font-medium">저장되었습니다! ✨</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GrammarRooms;