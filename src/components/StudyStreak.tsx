import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

interface StudyStreakProps {
  currentStreak: number;
  longestStreak: number;
  studyDays: string[]; // Array of dates in YYYY-MM-DD format
  weeklyGoal: number;
  weeklyProgress: number;
}

const StudyStreak: React.FC<StudyStreakProps> = ({
  currentStreak,
  longestStreak,
  studyDays,
  weeklyGoal,
  weeklyProgress
}) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  // Get current week dates
  const getCurrentWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 - (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates(selectedWeek);
  const weeklyCompletionRate = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  };

  const isStudyDay = (dateStr: string) => {
    return studyDays.includes(dateStr);
  };

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isFutureDate = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr > today;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-orange-400" />
          <h3 className="korean-text text-white text-xl font-medium">학습 연속</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{currentStreak}</div>
            <div className="text-xs text-gray-400 korean-text">현재</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{longestStreak}</div>
            <div className="text-xs text-gray-400 korean-text">최고</div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="korean-text text-white font-medium">주간 목표</span>
          <span className="text-blue-400">{weeklyProgress}/{weeklyGoal}분</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${weeklyCompletionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
          />
        </div>
        <div className="text-sm text-gray-400 korean-text">
          {weeklyCompletionRate.toFixed(0)}% 완료
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="korean-text text-white font-medium">학습 캘린더</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek(selectedWeek + 1)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ←
            </button>
            <span className="text-sm text-gray-400">
              {selectedWeek === 0 ? '이번 주' : `${selectedWeek}주 전`}
            </span>
            <button
              onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
              disabled={selectedWeek === 0}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const studied = isStudyDay(date);
            const today = isToday(date);
            const future = isFutureDate(date);
            
            return (
              <motion.div
                key={date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative ${
                  studied 
                    ? 'bg-green-500/30 border-2 border-green-400' 
                    : future
                    ? 'bg-gray-600/20 border border-gray-600'
                    : 'bg-red-500/20 border border-red-400/30'
                } ${today ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="korean-text text-white font-medium">
                  {getDayName(date)}
                </div>
                <div className="text-gray-300 text-xs">
                  {new Date(date).getDate()}
                </div>
                
                {studied && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <div className="w-3 h-3 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </motion.div>
                )}
                
                {today && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Streak Motivation */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-4 border border-orange-400/20">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="korean-text text-white font-medium">연속 학습 보상</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded ${currentStreak >= 3 ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/20 text-gray-400'}`}>
            <div className="text-xs korean-text">3일</div>
            <div className="text-xs">🔥</div>
          </div>
          <div className={`p-2 rounded ${currentStreak >= 7 ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/20 text-gray-400'}`}>
            <div className="text-xs korean-text">7일</div>
            <div className="text-xs">⭐</div>
          </div>
          <div className={`p-2 rounded ${currentStreak >= 30 ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/20 text-gray-400'}`}>
            <div className="text-xs korean-text">30일</div>
            <div className="text-xs">👑</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStreak;