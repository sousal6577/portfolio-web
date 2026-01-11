// ============================================================================
// HEALTHTRACK - API de Saúde e Wearables
// ============================================================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, Activity, Moon, Flame, Footprints,
  Droplets, Apple, TrendingUp, TrendingDown, Clock, 
  Calendar, Bell, Settings, User, Smartphone, Watch,
  Zap, Target, Award, ChevronRight, BarChart3
} from 'lucide-react';
import './HealthTrack.css';

// Mock Data
const healthStats = {
  heartRate: { current: 72, min: 58, max: 142, avg: 75, trend: 'stable' },
  steps: { current: 8547, goal: 10000, trend: 'up' },
  calories: { burned: 1847, intake: 2100, goal: 2200, trend: 'down' },
  sleep: { hours: 7.5, quality: 85, deepSleep: 2.1, remSleep: 1.8, trend: 'up' },
  water: { current: 6, goal: 8, trend: 'stable' },
  activeMinutes: { current: 45, goal: 60, trend: 'up' }
};

const weeklyData = [
  { day: 'Seg', steps: 9200, calories: 1920, sleep: 7.2 },
  { day: 'Ter', steps: 7800, calories: 1780, sleep: 6.8 },
  { day: 'Qua', steps: 10500, calories: 2100, sleep: 8.1 },
  { day: 'Qui', steps: 6500, calories: 1650, sleep: 7.0 },
  { day: 'Sex', steps: 8900, calories: 1890, sleep: 7.5 },
  { day: 'Sáb', steps: 12000, calories: 2350, sleep: 8.5 },
  { day: 'Dom', steps: 8547, calories: 1847, sleep: 7.5 }
];

const activities = [
  { id: 1, name: 'Corrida Matinal', type: 'run', duration: '32 min', calories: 380, time: '06:30', icon: '🏃' },
  { id: 2, name: 'Treino de Força', type: 'strength', duration: '45 min', calories: 290, time: '18:00', icon: '💪' },
  { id: 3, name: 'Yoga', type: 'yoga', duration: '25 min', calories: 95, time: '21:00', icon: '🧘' }
];

const achievements = [
  { id: 1, name: '10K Steps', icon: '🏆', date: 'Hoje', progress: 100 },
  { id: 2, name: 'Hidratação Perfeita', icon: '💧', date: 'Ontem', progress: 100 },
  { id: 3, name: 'Semana Ativa', icon: '⭐', date: '3 dias', progress: 75 },
  { id: 4, name: 'Sono Reparador', icon: '😴', date: '5 dias', progress: 60 }
];

const devices = [
  { id: 1, name: 'Apple Watch Series 9', status: 'connected', battery: 78, lastSync: '2 min' },
  { id: 2, name: 'Fitbit Charge 6', status: 'connected', battery: 92, lastSync: '5 min' },
  { id: 3, name: 'iPhone 15 Pro', status: 'connected', battery: 65, lastSync: 'Agora' }
];

const HealthTrack = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [heartRateHistory, setHeartRateHistory] = useState([]);

  // Simulate heart rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRateHistory(prev => {
        const newRate = 68 + Math.floor(Math.random() * 15);
        const newHistory = [...prev, { time: new Date(), rate: newRate }];
        return newHistory.slice(-20);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (current, goal) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return '#10b981';
    if (percentage >= 75) return '#6366f1';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const StatCard = ({ icon: Icon, label, value, unit, goal, trend, color }) => (
    <motion.div 
      className="ht-stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
    >
      <div className="ht-stat-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={24} />
      </div>
      <div className="ht-stat-info">
        <span className="ht-stat-label">{label}</span>
        <div className="ht-stat-value">
          <span>{value}</span>
          <span className="ht-stat-unit">{unit}</span>
        </div>
        {goal && (
          <div className="ht-stat-progress">
            <div className="ht-progress-bar">
              <div 
                className="ht-progress-fill"
                style={{ 
                  width: `${Math.min((value / goal) * 100, 100)}%`,
                  backgroundColor: getProgressColor(value, goal)
                }}
              />
            </div>
            <span className="ht-stat-goal">Meta: {goal}{unit}</span>
          </div>
        )}
      </div>
      {trend && (
        <div className={`ht-stat-trend ${trend}`}>
          {trend === 'up' && <TrendingUp size={16} />}
          {trend === 'down' && <TrendingDown size={16} />}
          {trend === 'stable' && <span>—</span>}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="healthtrack-app">
      {/* Header */}
      <header className="ht-header">
        <div className="ht-header-left">
          <Link to="/projetos" className="ht-back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div className="ht-logo">
            <Heart className="ht-logo-icon" />
            <span>HealthTrack</span>
          </div>
        </div>
        
        <nav className="ht-nav">
          <button 
            className={`ht-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={18} />
            <span>Visão Geral</span>
          </button>
          <button 
            className={`ht-nav-item ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <Activity size={18} />
            <span>Atividades</span>
          </button>
          <button 
            className={`ht-nav-item ${activeTab === 'sleep' ? 'active' : ''}`}
            onClick={() => setActiveTab('sleep')}
          >
            <Moon size={18} />
            <span>Sono</span>
          </button>
          <button 
            className={`ht-nav-item ${activeTab === 'devices' ? 'active' : ''}`}
            onClick={() => setActiveTab('devices')}
          >
            <Watch size={18} />
            <span>Dispositivos</span>
          </button>
        </nav>
        
        <div className="ht-header-right">
          <button className="ht-icon-btn">
            <Bell size={20} />
            <span className="ht-badge">2</span>
          </button>
          <button className="ht-icon-btn">
            <Settings size={20} />
          </button>
          <div className="ht-user-avatar">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ht-main">
        {/* Dashboard Overview */}
        {activeTab === 'overview' && (
          <div className="ht-dashboard">
            {/* Hero Stats */}
            <section className="ht-hero-stats">
              <motion.div 
                className="ht-heart-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="ht-heart-visual">
                  <div className="ht-heart-ring">
                    <Heart className="ht-heart-icon pulse" />
                  </div>
                  <div className="ht-heart-data">
                    <span className="ht-heart-value">{healthStats.heartRate.current}</span>
                    <span className="ht-heart-unit">BPM</span>
                  </div>
                </div>
                <div className="ht-heart-info">
                  <h3>Frequência Cardíaca</h3>
                  <div className="ht-heart-range">
                    <span>Min: {healthStats.heartRate.min}</span>
                    <span>Avg: {healthStats.heartRate.avg}</span>
                    <span>Max: {healthStats.heartRate.max}</span>
                  </div>
                  <div className="ht-heart-graph">
                    {heartRateHistory.map((data, i) => (
                      <div 
                        key={i}
                        className="ht-graph-bar"
                        style={{ height: `${(data.rate - 50) * 2}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="ht-quick-stats">
                <StatCard 
                  icon={Footprints}
                  label="Passos"
                  value={healthStats.steps.current.toLocaleString()}
                  unit=""
                  goal={healthStats.steps.goal}
                  trend={healthStats.steps.trend}
                  color="#6366f1"
                />
                <StatCard 
                  icon={Flame}
                  label="Calorias"
                  value={healthStats.calories.burned}
                  unit=" kcal"
                  goal={healthStats.calories.goal}
                  trend={healthStats.calories.trend}
                  color="#ef4444"
                />
                <StatCard 
                  icon={Moon}
                  label="Sono"
                  value={healthStats.sleep.hours}
                  unit="h"
                  goal={8}
                  trend={healthStats.sleep.trend}
                  color="#8b5cf6"
                />
                <StatCard 
                  icon={Droplets}
                  label="Água"
                  value={healthStats.water.current}
                  unit=" copos"
                  goal={healthStats.water.goal}
                  trend={healthStats.water.trend}
                  color="#06b6d4"
                />
              </div>
            </section>

            {/* Weekly Chart */}
            <section className="ht-weekly-section">
              <div className="ht-section-header">
                <h2>Resumo Semanal</h2>
                <div className="ht-time-toggle">
                  <button 
                    className={timeRange === 'week' ? 'active' : ''}
                    onClick={() => setTimeRange('week')}
                  >
                    Semana
                  </button>
                  <button 
                    className={timeRange === 'month' ? 'active' : ''}
                    onClick={() => setTimeRange('month')}
                  >
                    Mês
                  </button>
                </div>
              </div>
              
              <div className="ht-chart-container">
                <div className="ht-bar-chart">
                  {weeklyData.map((day, i) => (
                    <div key={i} className="ht-chart-bar">
                      <div 
                        className="ht-bar-fill"
                        style={{ height: `${(day.steps / 15000) * 100}%` }}
                      >
                        <span className="ht-bar-value">{(day.steps / 1000).toFixed(1)}k</span>
                      </div>
                      <span className="ht-bar-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Today's Activities */}
            <section className="ht-activities-section">
              <div className="ht-section-header">
                <h2>Atividades de Hoje</h2>
                <button className="ht-see-all">Ver todas <ChevronRight size={16} /></button>
              </div>
              
              <div className="ht-activities-list">
                {activities.map((activity, i) => (
                  <motion.div 
                    key={activity.id}
                    className="ht-activity-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="ht-activity-icon">{activity.icon}</span>
                    <div className="ht-activity-info">
                      <h4>{activity.name}</h4>
                      <span className="ht-activity-time">
                        <Clock size={14} /> {activity.time}
                      </span>
                    </div>
                    <div className="ht-activity-stats">
                      <span>{activity.duration}</span>
                      <span className="ht-activity-calories">
                        <Flame size={14} /> {activity.calories} kcal
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="ht-achievements-section">
              <div className="ht-section-header">
                <h2>Conquistas</h2>
                <button className="ht-see-all">Ver todas <ChevronRight size={16} /></button>
              </div>
              
              <div className="ht-achievements-grid">
                {achievements.map((achievement, i) => (
                  <motion.div 
                    key={achievement.id}
                    className="ht-achievement-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="ht-achievement-icon">{achievement.icon}</span>
                    <span className="ht-achievement-name">{achievement.name}</span>
                    <div className="ht-achievement-progress">
                      <div 
                        className="ht-achievement-fill"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span className="ht-achievement-date">{achievement.date}</span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="ht-activity-page">
            <div className="ht-page-header">
              <h1>Minhas Atividades</h1>
              <p>Acompanhe seus exercícios e atividades físicas</p>
            </div>
            
            <div className="ht-activity-stats-grid">
              <StatCard 
                icon={Zap}
                label="Minutos Ativos"
                value={healthStats.activeMinutes.current}
                unit=" min"
                goal={healthStats.activeMinutes.goal}
                trend="up"
                color="#f59e0b"
              />
              <StatCard 
                icon={Target}
                label="Metas Atingidas"
                value={5}
                unit="/7"
                color="#10b981"
              />
              <StatCard 
                icon={Award}
                label="Sequência"
                value={12}
                unit=" dias"
                color="#8b5cf6"
              />
            </div>
            
            <div className="ht-activity-history">
              <h3>Histórico de Atividades</h3>
              {[...activities, ...activities].map((activity, i) => (
                <div key={`${activity.id}-${i}`} className="ht-history-item">
                  <span className="ht-history-icon">{activity.icon}</span>
                  <div className="ht-history-info">
                    <h4>{activity.name}</h4>
                    <span>{activity.duration} • {activity.calories} kcal</span>
                  </div>
                  <span className="ht-history-date">
                    {i < 3 ? 'Hoje' : i < 6 ? 'Ontem' : '2 dias atrás'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sleep Tab */}
        {activeTab === 'sleep' && (
          <div className="ht-sleep-page">
            <div className="ht-page-header">
              <h1>Análise do Sono</h1>
              <p>Entenda seus padrões de sono e melhore sua qualidade</p>
            </div>
            
            <div className="ht-sleep-overview">
              <div className="ht-sleep-main-card">
                <div className="ht-sleep-score">
                  <div className="ht-score-ring">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" className="ht-score-bg" />
                      <circle 
                        cx="50" cy="50" r="45" 
                        className="ht-score-fill"
                        style={{ strokeDasharray: `${healthStats.sleep.quality * 2.83} 283` }}
                      />
                    </svg>
                    <span className="ht-score-value">{healthStats.sleep.quality}</span>
                  </div>
                  <span className="ht-score-label">Qualidade do Sono</span>
                </div>
                
                <div className="ht-sleep-details">
                  <div className="ht-sleep-stat">
                    <Moon size={20} />
                    <div>
                      <span className="ht-sleep-stat-value">{healthStats.sleep.hours}h</span>
                      <span className="ht-sleep-stat-label">Total</span>
                    </div>
                  </div>
                  <div className="ht-sleep-stat">
                    <span className="ht-sleep-icon deep">💤</span>
                    <div>
                      <span className="ht-sleep-stat-value">{healthStats.sleep.deepSleep}h</span>
                      <span className="ht-sleep-stat-label">Sono Profundo</span>
                    </div>
                  </div>
                  <div className="ht-sleep-stat">
                    <span className="ht-sleep-icon rem">🌙</span>
                    <div>
                      <span className="ht-sleep-stat-value">{healthStats.sleep.remSleep}h</span>
                      <span className="ht-sleep-stat-label">Sono REM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="ht-sleep-chart">
                <h3>Estágios do Sono</h3>
                <div className="ht-sleep-stages">
                  <div className="ht-stage" style={{ width: '15%', backgroundColor: '#6366f1' }}>
                    <span>Acordado</span>
                  </div>
                  <div className="ht-stage" style={{ width: '28%', backgroundColor: '#8b5cf6' }}>
                    <span>Sono REM</span>
                  </div>
                  <div className="ht-stage" style={{ width: '32%', backgroundColor: '#a78bfa' }}>
                    <span>Sono Leve</span>
                  </div>
                  <div className="ht-stage" style={{ width: '25%', backgroundColor: '#c4b5fd' }}>
                    <span>Sono Profundo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="ht-devices-page">
            <div className="ht-page-header">
              <h1>Dispositivos Conectados</h1>
              <p>Gerencie seus wearables e integrações</p>
            </div>
            
            <div className="ht-devices-list">
              {devices.map((device, i) => (
                <motion.div 
                  key={device.id}
                  className="ht-device-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="ht-device-icon">
                    {device.name.includes('Watch') && <Watch size={32} />}
                    {device.name.includes('Fitbit') && <Activity size={32} />}
                    {device.name.includes('iPhone') && <Smartphone size={32} />}
                  </div>
                  <div className="ht-device-info">
                    <h3>{device.name}</h3>
                    <span className={`ht-device-status ${device.status}`}>
                      {device.status === 'connected' ? '● Conectado' : '○ Desconectado'}
                    </span>
                  </div>
                  <div className="ht-device-meta">
                    <div className="ht-device-battery">
                      <span style={{ 
                        color: device.battery > 50 ? '#10b981' : device.battery > 20 ? '#f59e0b' : '#ef4444' 
                      }}>
                        🔋 {device.battery}%
                      </span>
                    </div>
                    <span className="ht-device-sync">Sincronizado há {device.lastSync}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="ht-add-device">
              <span>+</span> Adicionar Dispositivo
            </button>
          </div>
        )}
      </main>

      {/* Demo Notice */}
      <div className="ht-demo-notice">
        <span>❤️ Demo Interativo - HealthTrack API</span>
        <Link to="/projetos" className="ht-demo-link">Voltar ao Portfólio</Link>
      </div>
    </div>
  );
};

export default HealthTrack;
