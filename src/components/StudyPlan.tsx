import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Target, Clock, BookOpen, CheckCircle, AlertCircle, Plus, Edit3 } from 'lucide-react';

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  totalItems: number;
  category: 'grammar' | 'vocabulary' | 'quiz' | 'speaking';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface StudyPlanProps {
  goals: StudyGoal[];
  onAddGoal: (goal: Omit<StudyGoal, 'id'>) => void;
  onUpdateGoal: (goalId: string, updates: Partial<StudyGoal>) => void;
  onDeleteGoal: (goalId: string) => void;
}

const StudyPlan: React.FC<StudyPlanProps> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    totalItems: 10,
    category: 'grammar' as const,
    priority: 'medium' as const
  });

  const categories = [
    { id: 'all', name: '전체', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'grammar', name: '문법', icon: <Target className="w-4 h-4" /> },
    { id: 'vocabulary', name: '어휘', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', name: '퀴즈', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'speaking', name: '말하기', icon: <Clock className="w-4 h-4" /> }
  ];

  const priorityColors = {
    low: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    high: 'from-red-500 to-pink-500'
  };

  const priorityBorders = {
    low: 'border-green-400/30',
    medium: 'border-yellow-400/30',
    high: 'border-red-400/30'
  };

  const filteredGoals = goals.filter(goal => 
    selectedCategory === 'all' || goal.category === selectedCategory
  );

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;

    onAddGoal({
      ...newGoal,
      targetDate: new Date(newGoal.targetDate),
      progress: 0,
      completed: false
    });

    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      totalItems: 10,
      category: 'grammar',
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const getDaysUntilDeadline = (targetDate: Date) => {
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressPercentage = (goal: StudyGoal) => {
    return Math.min((goal.progress / goal.totalItems) * 100, 100);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h3 className="korean-text text-white text-xl font-medium">학습 계획</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{overallProgress}%</div>
          <div className="text-sm text-gray-400 korean-text">전체 진도</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="korean-text text-white">전체 목표 달성률</span>
          <span className="text-blue-400">{completedGoals}/{totalGoals}</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                : 'bg-black/20 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {category.icon}
            <span className="korean-text">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Add Goal Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAddForm(true)}
        className="w-full mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-dashed border-green-400/30 rounded-lg p-4 text-green-300 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span className="korean-text font-medium">새 목표 추가</span>
      </motion.button>

      {/* Add Goal Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-black/20 rounded-lg p-4 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="korean-text text-white text-sm font-medium mb-2 block">
                  목표 제목
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="예: TOPIK 3급 문법 완주"
                  className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="korean-text text-white text-sm font-medium mb-2 block">
                  설명
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="목표에 대한 자세한 설명..."
                  className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="korean-text text-white text-sm font-medium mb-2 block">
                    목표 날짜
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="korean-text text-white text-sm font-medium mb-2 block">
                    총 항목 수
                  </label>
                  <input
                    type="number"
                    value={newGoal.totalItems}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, totalItems: parseInt(e.target.value) }))}
                    min="1"
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="korean-text text-white text-sm font-medium mb-2 block">
                    카테고리
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="grammar">문법</option>
                    <option value="vocabulary">어휘</option>
                    <option value="quiz">퀴즈</option>
                    <option value="speaking">말하기</option>
                  </select>
                </div>

                <div>
                  <label className="korean-text text-white text-sm font-medium mb-2 block">
                    우선순위
                  </label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="low">낮음</option>
                    <option value="medium">보통</option>
                    <option value="high">높음</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg korean-text font-medium"
                >
                  목표 추가
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg korean-text font-medium"
                >
                  취소
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredGoals.map((goal, index) => {
            const daysLeft = getDaysUntilDeadline(goal.targetDate);
            const progressPercentage = getProgressPercentage(goal);
            const isOverdue = daysLeft < 0 && !goal.completed;
            const isUrgent = daysLeft <= 3 && daysLeft >= 0 && !goal.completed;

            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-r ${priorityColors[goal.priority]}/10 rounded-xl p-4 border ${priorityBorders[goal.priority]} ${
                  goal.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`korean-text font-bold ${goal.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                        {goal.title}
                      </h4>
                      {goal.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {isOverdue && <AlertCircle className="w-5 h-5 text-red-400" />}
                      {isUrgent && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                    </div>
                    {goal.description && (
                      <p className="text-gray-300 text-sm mb-2">{goal.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400 korean-text">진행도</span>
                    <span className="text-xs text-gray-400">
                      {goal.progress}/{goal.totalItems} ({progressPercentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-gradient-to-r ${priorityColors[goal.priority]} h-2 rounded-full`}
                    />
                  </div>
                </div>

                {/* Goal Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      goal.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                      goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {goal.priority === 'high' ? '높음' :
                       goal.priority === 'medium' ? '보통' : '낮음'}
                    </span>
                    <span className="text-gray-400 korean-text">
                      {goal.category === 'grammar' ? '문법' :
                       goal.category === 'vocabulary' ? '어휘' :
                       goal.category === 'quiz' ? '퀴즈' : '말하기'}
                    </span>
                  </div>
                  
                  <div className={`text-xs ${
                    isOverdue ? 'text-red-400' :
                    isUrgent ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {isOverdue ? `${Math.abs(daysLeft)}일 지남` :
                     daysLeft === 0 ? '오늘 마감' :
                     `${daysLeft}일 남음`}
                  </div>
                </div>

                {/* Quick Actions */}
                <AnimatePresence>
                  {editingGoal === goal.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-white/10 flex gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateGoal(goal.id, { 
                          progress: Math.min(goal.progress + 1, goal.totalItems) 
                        })}
                        disabled={goal.completed}
                        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 rounded-lg text-sm korean-text font-medium disabled:opacity-50"
                      >
                        진도 +1
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateGoal(goal.id, { completed: !goal.completed })}
                        className={`flex-1 py-2 rounded-lg text-sm korean-text font-medium ${
                          goal.completed
                            ? 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-300'
                            : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
                        }`}
                      >
                        {goal.completed ? '완료 취소' : '완료 표시'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDeleteGoal(goal.id)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 rounded-lg text-sm korean-text font-medium"
                      >
                        삭제
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="korean-text text-gray-400">설정된 목표가 없습니다.</p>
          <p className="korean-text text-gray-500 text-sm">새 목표를 추가해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default StudyPlan;