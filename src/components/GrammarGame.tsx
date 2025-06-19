import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Target, Clock, Star, Shuffle, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { GrammarPoint } from '../types/grammar';

interface GrammarGameProps {
  grammarPoints: GrammarPoint[];
  onGameComplete: (score: number, totalQuestions: number) => void;
}

type GameMode = 'speed-quiz' | 'memory-match' | 'sentence-builder' | 'grammar-race';

interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  grammarPoint: GrammarPoint;
}

const GrammarGame: React.FC<GrammarGameProps> = ({ grammarPoints, onGameComplete }) => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Generate game questions
  const generateQuestions = (mode: GameMode): GameQuestion[] => {
    const shuffled = [...grammarPoints].sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, 10).map((grammar, index) => {
      const wrongOptions = grammarPoints
        .filter(g => g.id !== grammar.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(g => g.korean);

      return {
        id: `q-${index}`,
        question: mode === 'speed-quiz' 
          ? `What does "${grammar.english}" mean in Korean?`
          : `Complete the sentence: ${grammar.examples[0].korean.replace(grammar.korean.split('/')[0], '____')}`,
        options: [grammar.korean, ...wrongOptions].sort(() => Math.random() - 0.5),
        correctAnswer: grammar.korean,
        grammarPoint: grammar
      };
    });
  };

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (gameActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    const newQuestions = generateQuestions(mode);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(mode === 'speed-quiz' ? 60 : 120);
    setGameActive(true);
    setSelectedAnswer('');
    setShowResult(false);
    setStreak(0);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer('');
      } else {
        endGame();
      }
    }, 1500);
  };

  const endGame = () => {
    setGameActive(false);
    setShowResult(true);
    onGameComplete(score, questions.length);
  };

  const resetGame = () => {
    setGameMode(null);
    setCurrentQuestion(0);
    setQuestions([]);
    setScore(0);
    setTimeLeft(60);
    setGameActive(false);
    setSelectedAnswer('');
    setShowResult(false);
    setStreak(0);
  };

  const getGameModeInfo = (mode: GameMode) => {
    switch (mode) {
      case 'speed-quiz':
        return { name: '스피드 퀴즈', icon: <Target className="w-5 h-5" />, description: '60초 안에 최대한 많이!' };
      case 'memory-match':
        return { name: '기억 매칭', icon: <Star className="w-5 h-5" />, description: '문법과 의미를 매칭하세요' };
      case 'sentence-builder':
        return { name: '문장 만들기', icon: <Shuffle className="w-5 h-5" />, description: '올바른 문장을 완성하세요' };
      case 'grammar-race':
        return { name: '문법 레이스', icon: <Trophy className="w-5 h-5" />, description: '시간과의 경주!' };
      default:
        return { name: '', icon: null, description: '' };
    }
  };

  if (!gameMode) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="korean-text text-white text-2xl font-bold mb-2">문법 게임</h2>
          <p className="english-text text-gray-400">Choose your game mode</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['speed-quiz', 'memory-match', 'sentence-builder', 'grammar-race'] as GameMode[]).map((mode) => {
            const info = getGameModeInfo(mode);
            return (
              <motion.button
                key={mode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startGame(mode)}
                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-xl p-6 text-left hover:from-purple-500/30 hover:to-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {info.icon}
                  <h3 className="korean-text text-white font-bold">{info.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{info.description}</p>
              </motion.button>
            );
          })}
        </div>

        {bestStreak > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-400/30">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="korean-text text-yellow-300">최고 연속: {bestStreak}개</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
      >
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="korean-text text-white text-2xl font-bold mb-4">게임 완료!</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-400">{score}</div>
            <div className="text-sm text-gray-400 korean-text">정답</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{percentage}%</div>
            <div className="text-sm text-gray-400 korean-text">정확도</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">{bestStreak}</div>
            <div className="text-sm text-gray-400 korean-text">최고 연속</div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startGame(gameMode)}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg text-white korean-text font-medium"
          >
            다시 하기
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg text-white korean-text font-medium"
          >
            메뉴로
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
    >
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {getGameModeInfo(gameMode).icon}
          <h3 className="korean-text text-white font-bold">{getGameModeInfo(gameMode).name}</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className={`font-mono ${timeLeft <= 10 ? 'text-red-400' : 'text-blue-400'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">{score}/{questions.length}</span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">{streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/20 rounded-full h-2 mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h4 className="korean-text text-white text-lg mb-2">
          문제 {currentQuestion + 1}
        </h4>
        <p className="english-text text-gray-300 text-xl mb-6">
          {currentQ.question}
        </p>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== ''}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedAnswer === option
                  ? option === currentQ.correctAnswer
                    ? 'bg-green-500/20 border-green-400 text-green-300'
                    : 'bg-red-500/20 border-red-400 text-red-300'
                  : selectedAnswer !== '' && option === currentQ.correctAnswer
                  ? 'bg-green-500/20 border-green-400 text-green-300'
                  : 'bg-black/20 border-white/20 text-white hover:bg-white/10'
              } ${selectedAnswer !== '' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span className="korean-text font-medium">{option}</span>
                {selectedAnswer !== '' && (
                  <div>
                    {option === currentQ.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : selectedAnswer === option ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Question Info */}
      {selectedAnswer !== '' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 rounded-lg p-4"
        >
          <p className="korean-text text-white font-medium mb-2">
            {currentQ.grammarPoint.korean} - {currentQ.grammarPoint.english}
          </p>
          <p className="text-gray-400 text-sm">
            {currentQ.grammarPoint.usage}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GrammarGame;