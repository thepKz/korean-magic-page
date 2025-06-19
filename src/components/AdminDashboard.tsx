import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Database,
  Activity,
  Globe,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit3,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalGrammar: number;
  totalQuizzes: number;
  serverStatus: 'online' | 'offline' | 'maintenance';
  databaseStatus: 'connected' | 'disconnected' | 'error';
  aiStatus: 'active' | 'inactive' | 'error';
  memoryUsage: number;
  cpuUsage: number;
  uptime: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  level: string;
  lastActive: string;
  totalStudyTime: number;
  quizScore: number;
  status: 'active' | 'inactive' | 'banned';
}

interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  status: 'active' | 'deprecated' | 'maintenance';
  requests: number;
  avgResponseTime: number;
  errorRate: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'routes' | 'system' | 'settings'>('overview');
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 1247,
    activeUsers: 89,
    totalGrammar: 53,
    totalQuizzes: 2847,
    serverStatus: 'online',
    databaseStatus: 'connected',
    aiStatus: 'active',
    memoryUsage: 67,
    cpuUsage: 23,
    uptime: '7d 14h 32m'
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'student123',
      email: 'student@example.com',
      level: 'intermediate',
      lastActive: '2024-01-15 14:30',
      totalStudyTime: 1250,
      quizScore: 85,
      status: 'active'
    },
    {
      id: '2',
      username: 'learner456',
      email: 'learner@example.com',
      level: 'beginner',
      lastActive: '2024-01-15 12:15',
      totalStudyTime: 680,
      quizScore: 72,
      status: 'active'
    },
    {
      id: '3',
      username: 'advanced789',
      email: 'advanced@example.com',
      level: 'advanced',
      lastActive: '2024-01-14 18:45',
      totalStudyTime: 2340,
      quizScore: 94,
      status: 'inactive'
    }
  ]);

  const [routes] = useState<Route[]>([
    {
      method: 'GET',
      path: '/api/grammar',
      description: 'Get all grammar points',
      status: 'active',
      requests: 15420,
      avgResponseTime: 120,
      errorRate: 0.2
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'User authentication',
      status: 'active',
      requests: 8934,
      avgResponseTime: 340,
      errorRate: 2.1
    },
    {
      method: 'GET',
      path: '/api/progress',
      description: 'Get user progress',
      status: 'active',
      requests: 12567,
      avgResponseTime: 89,
      errorRate: 0.1
    },
    {
      method: 'POST',
      path: '/api/ai/chat',
      description: 'AI chatbot interaction',
      status: 'active',
      requests: 3421,
      avgResponseTime: 1250,
      errorRate: 1.8
    },
    {
      method: 'GET',
      path: '/api/quiz/generate',
      description: 'Generate quiz questions',
      status: 'active',
      requests: 9876,
      avgResponseTime: 200,
      errorRate: 0.5
    },
    {
      method: 'PUT',
      path: '/api/user/profile',
      description: 'Update user profile',
      status: 'active',
      requests: 2341,
      avgResponseTime: 180,
      errorRate: 1.2
    },
    {
      method: 'POST',
      path: '/api/progress/quiz-result',
      description: 'Record quiz results',
      status: 'active',
      requests: 18765,
      avgResponseTime: 95,
      errorRate: 0.3
    },
    {
      method: 'GET',
      path: '/api/grammar/random/:count',
      description: 'Get random grammar points',
      status: 'active',
      requests: 5432,
      avgResponseTime: 110,
      errorRate: 0.1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showSystemLogs, setShowSystemLogs] = useState(false);

  const tabs = [
    { id: 'overview', name: '개요', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', name: '사용자', icon: <Users className="w-5 h-5" /> },
    { id: 'routes', name: 'API 라우트', icon: <Globe className="w-5 h-5" /> },
    { id: 'system', name: '시스템', icon: <Activity className="w-5 h-5" /> },
    { id: 'settings', name: '설정', icon: <Settings className="w-5 h-5" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'active':
        return 'text-green-400';
      case 'offline':
      case 'disconnected':
      case 'inactive':
        return 'text-red-400';
      case 'maintenance':
      case 'error':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'offline':
      case 'disconnected':
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      case 'maintenance':
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoutes = routes.filter(route =>
    route.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserAction = (userId: string, action: 'ban' | 'unban' | 'delete') => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'ban':
            return { ...user, status: 'banned' as const };
          case 'unban':
            return { ...user, status: 'active' as const };
          default:
            return user;
        }
      }
      return user;
    }).filter(user => action !== 'delete' || user.id !== userId));
  };

  const refreshSystemStats = () => {
    // Simulate API call to refresh stats
    setSystemStats(prev => ({
      ...prev,
      memoryUsage: Math.floor(Math.random() * 100),
      cpuUsage: Math.floor(Math.random() * 100),
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="korean-text">돌아가기</span>
        </motion.button>

        <div className="text-center">
          <h1 className="text-3xl font-light korean-text text-white mb-2">
            관리자 대시보드
          </h1>
          <p className="text-sm english-text text-gray-400">
            Admin Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshSystemStats}
            className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-400/20 text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="korean-text text-sm">새로고침</span>
          </motion.button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                : 'bg-black/20 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {tab.icon}
            <span className="korean-text">{tab.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-400" />
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.serverStatus)}`}>
                      {getStatusIcon(systemStats.serverStatus)}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{systemStats.totalUsers}</div>
                  <div className="text-sm text-gray-400 korean-text">총 사용자</div>
                  <div className="text-xs text-green-400 mt-1">+{systemStats.activeUsers} 활성</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="w-8 h-8 text-green-400" />
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.databaseStatus)}`}>
                      {getStatusIcon(systemStats.databaseStatus)}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{systemStats.totalGrammar}</div>
                  <div className="text-sm text-gray-400 korean-text">문법 포인트</div>
                  <div className="text-xs text-blue-400 mt-1">3개 언어</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.aiStatus)}`}>
                      {getStatusIcon(systemStats.aiStatus)}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{systemStats.totalQuizzes}</div>
                  <div className="text-sm text-gray-400 korean-text">완료된 퀴즈</div>
                  <div className="text-xs text-purple-400 mt-1">AI 생성</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-orange-400" />
                    <div className="text-xs text-gray-400">{systemStats.uptime}</div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{systemStats.memoryUsage}%</div>
                  <div className="text-sm text-gray-400 korean-text">메모리 사용량</div>
                  <div className="text-xs text-orange-400 mt-1">CPU: {systemStats.cpuUsage}%</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="korean-text text-white text-lg font-medium mb-4">빠른 작업</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 px-4 py-3 rounded-lg border border-green-400/20 text-green-300 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="korean-text text-sm">문법 추가</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-3 rounded-lg border border-blue-400/20 text-blue-300 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span className="korean-text text-sm">데이터 내보내기</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 px-4 py-3 rounded-lg border border-purple-400/20 text-purple-300 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="korean-text text-sm">백업 복원</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 px-4 py-3 rounded-lg border border-orange-400/20 text-orange-300 transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="korean-text text-sm">보안 검사</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="사용자 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-3 rounded-lg border border-blue-400/20 text-blue-300 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span className="korean-text">필터</span>
                </motion.button>
              </div>

              {/* Users Table */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">사용자</th>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">레벨</th>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">학습시간</th>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">점수</th>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">상태</th>
                        <th className="px-6 py-4 text-left korean-text text-white font-medium">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-t border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-white font-medium">{user.username}</div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                              <div className="text-gray-500 text-xs">{user.lastActive}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              user.level === 'beginner' ? 'bg-green-500/20 text-green-300' :
                              user.level === 'intermediate' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-purple-500/20 text-purple-300'
                            }`}>
                              {user.level === 'beginner' ? '초급' :
                               user.level === 'intermediate' ? '중급' : '고급'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white">{Math.floor(user.totalStudyTime / 60)}시간</td>
                          <td className="px-6 py-4 text-white">{user.quizScore}%</td>
                          <td className="px-6 py-4">
                            <div className={`flex items-center gap-1 ${getStatusColor(user.status)}`}>
                              {getStatusIcon(user.status)}
                              <span className="text-sm korean-text">
                                {user.status === 'active' ? '활성' :
                                 user.status === 'inactive' ? '비활성' : '차단됨'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUserAction(user.id, user.status === 'banned' ? 'unban' : 'ban')}
                                className={`transition-colors ${
                                  user.status === 'banned' 
                                    ? 'text-green-400 hover:text-green-300' 
                                    : 'text-yellow-400 hover:text-yellow-300'
                                }`}
                              >
                                {user.status === 'banned' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUserAction(user.id, 'delete')}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <motion.div
              key="routes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="API 라우트 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </div>

              {/* Routes List */}
              <div className="space-y-4">
                {filteredRoutes.map((route, index) => (
                  <motion.div
                    key={`${route.method}-${route.path}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          route.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                          route.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                          route.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {route.method}
                        </span>
                        <code className="text-white font-mono">{route.path}</code>
                        <div className={`flex items-center gap-1 ${getStatusColor(route.status)}`}>
                          {getStatusIcon(route.status)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{route.requests.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs korean-text">요청 수</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{route.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-blue-400 font-medium">{route.avgResponseTime}ms</div>
                        <div className="text-gray-400 text-xs korean-text">평균 응답시간</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${route.errorRate > 2 ? 'text-red-400' : route.errorRate > 1 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {route.errorRate}%
                        </div>
                        <div className="text-gray-400 text-xs korean-text">오류율</div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-400 font-medium">
                          {route.status === 'active' ? '정상' : route.status === 'deprecated' ? '지원중단' : '점검중'}
                        </div>
                        <div className="text-gray-400 text-xs korean-text">상태</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* System Health */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="korean-text text-white font-medium">서버 상태</h3>
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.serverStatus)}`}>
                      {getStatusIcon(systemStats.serverStatus)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">업타임</span>
                      <span className="text-white">{systemStats.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">메모리</span>
                      <span className="text-white">{systemStats.memoryUsage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">CPU</span>
                      <span className="text-white">{systemStats.cpuUsage}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="korean-text text-white font-medium">데이터베이스</h3>
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.databaseStatus)}`}>
                      {getStatusIcon(systemStats.databaseStatus)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">연결 상태</span>
                      <span className="text-green-400">연결됨</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">컬렉션</span>
                      <span className="text-white">5개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">문서 수</span>
                      <span className="text-white">12,847</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="korean-text text-white font-medium">AI 서비스</h3>
                    <div className={`flex items-center gap-1 ${getStatusColor(systemStats.aiStatus)}`}>
                      {getStatusIcon(systemStats.aiStatus)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">OpenAI</span>
                      <span className="text-green-400">활성</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">모델</span>
                      <span className="text-white">GPT-4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 korean-text">요청/분</span>
                      <span className="text-white">23</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Logs */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="korean-text text-white font-medium">시스템 로그</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSystemLogs(!showSystemLogs)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showSystemLogs ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="korean-text text-sm">
                      {showSystemLogs ? '숨기기' : '보기'}
                    </span>
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {showSystemLogs && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-black/40 rounded-lg p-4 font-mono text-sm"
                    >
                      <div className="space-y-1">
                        <div className="text-green-400">[2024-01-15 14:32:15] INFO: Server started on port 5000</div>
                        <div className="text-blue-400">[2024-01-15 14:32:16] INFO: MongoDB connected successfully</div>
                        <div className="text-green-400">[2024-01-15 14:32:17] INFO: OpenAI API initialized</div>
                        <div className="text-yellow-400">[2024-01-15 14:35:22] WARN: High memory usage detected (67%)</div>
                        <div className="text-green-400">[2024-01-15 14:36:45] INFO: User authentication successful</div>
                        <div className="text-blue-400">[2024-01-15 14:37:12] INFO: AI chat request processed</div>
                        <div className="text-green-400">[2024-01-15 14:38:33] INFO: Quiz generated successfully</div>
                        <div className="text-red-400">[2024-01-15 14:39:01] ERROR: Rate limit exceeded for IP 192.168.1.100</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="korean-text text-white text-lg font-medium mb-6">시스템 설정</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="korean-text text-white text-sm font-medium mb-2 block">
                        최대 사용자 수
                      </label>
                      <input
                        type="number"
                        defaultValue="10000"
                        className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="korean-text text-white text-sm font-medium mb-2 block">
                        AI 요청 제한 (분당)
                      </label>
                      <input
                        type="number"
                        defaultValue="20"
                        className="w-full bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="korean-text text-white font-medium">유지보수 모드</div>
                      <div className="text-gray-400 text-sm">시스템 점검 시 활성화</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="korean-text text-white font-medium">자동 백업</div>
                      <div className="text-gray-400 text-sm">매일 자동으로 데이터 백업</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg korean-text font-medium"
                    >
                      설정 저장
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;