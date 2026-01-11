// ============================================================================
// TASKFLOW - Aplicativo de Gestão de Tarefas
// ============================================================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Circle, Clock, Calendar,
  Plus, Trash2, Edit3, Filter, Search, Bell, User,
  LayoutGrid, List, ChevronDown, Star, Flag, Tag,
  Play, Pause, RotateCcw, BarChart3, Users, Zap
} from 'lucide-react';
import './TaskFlow.css';

// Mock Data
const mockTasks = [
  {
    id: 1,
    title: 'Finalizar design do dashboard',
    description: 'Completar todos os componentes visuais do dashboard principal',
    status: 'in-progress',
    priority: 'high',
    project: 'TaskFlow App',
    dueDate: '2026-01-15',
    assignee: { name: 'Lucas', avatar: '👨‍💻' },
    tags: ['Design', 'UI/UX'],
    subtasks: [
      { id: 1, title: 'Header navigation', done: true },
      { id: 2, title: 'Sidebar menu', done: true },
      { id: 3, title: 'Main content area', done: false },
      { id: 4, title: 'Footer actions', done: false }
    ],
    createdAt: '2026-01-08'
  },
  {
    id: 2,
    title: 'Implementar autenticação OAuth',
    description: 'Adicionar login com Google e GitHub',
    status: 'todo',
    priority: 'medium',
    project: 'TaskFlow App',
    dueDate: '2026-01-20',
    assignee: { name: 'Maria', avatar: '👩‍💻' },
    tags: ['Backend', 'Security'],
    subtasks: [],
    createdAt: '2026-01-10'
  },
  {
    id: 3,
    title: 'Otimizar performance do app',
    description: 'Melhorar tempo de carregamento e responsividade',
    status: 'done',
    priority: 'high',
    project: 'TaskFlow App',
    dueDate: '2026-01-12',
    assignee: { name: 'Lucas', avatar: '👨‍💻' },
    tags: ['Performance', 'Optimization'],
    subtasks: [],
    createdAt: '2026-01-05'
  },
  {
    id: 4,
    title: 'Criar documentação da API',
    description: 'Documentar todos os endpoints REST',
    status: 'todo',
    priority: 'low',
    project: 'TaskFlow API',
    dueDate: '2026-01-25',
    assignee: { name: 'Pedro', avatar: '👨‍🔧' },
    tags: ['Docs', 'API'],
    subtasks: [],
    createdAt: '2026-01-11'
  },
  {
    id: 5,
    title: 'Testes de integração',
    description: 'Implementar testes E2E com Cypress',
    status: 'in-progress',
    priority: 'medium',
    project: 'TaskFlow App',
    dueDate: '2026-01-18',
    assignee: { name: 'Ana', avatar: '👩‍🔬' },
    tags: ['Testing', 'QA'],
    subtasks: [
      { id: 1, title: 'Setup Cypress', done: true },
      { id: 2, title: 'Write login tests', done: false },
      { id: 3, title: 'Write dashboard tests', done: false }
    ],
    createdAt: '2026-01-09'
  }
];

const mockProjects = [
  { id: 1, name: 'TaskFlow App', color: '#6366f1', tasks: 12 },
  { id: 2, name: 'TaskFlow API', color: '#10b981', tasks: 8 },
  { id: 3, name: 'Marketing Site', color: '#f59e0b', tasks: 5 }
];

const TaskFlow = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [view, setView] = useState('board'); // board, list
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // Pomodoro Timer
  useEffect(() => {
    let interval = null;
    if (isPomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsPomodoroActive(false);
      // Notification would go here
    }
    return () => clearInterval(interval);
  }, [isPomodoroActive, pomodoroTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetPomodoro = () => {
    setIsPomodoroActive(false);
    setPomodoroTime(25 * 60);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'todo');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
  const doneTasks = filteredTasks.filter(t => t.status === 'done');

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const statuses = ['todo', 'in-progress', 'done'];
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const TaskCard = ({ task }) => (
    <motion.div
      className="tf-task-card"
      layoutId={`task-${task.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => setSelectedTask(task)}
    >
      <div className="tf-task-header">
        <button 
          className={`tf-task-check ${task.status === 'done' ? 'done' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
        >
          {task.status === 'done' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
        </button>
        <span className="tf-task-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          <Flag size={12} />
        </span>
      </div>
      
      <h4 className={`tf-task-title ${task.status === 'done' ? 'done' : ''}`}>
        {task.title}
      </h4>
      
      <p className="tf-task-description">{task.description}</p>
      
      {task.subtasks.length > 0 && (
        <div className="tf-task-progress">
          <div className="tf-progress-bar">
            <div 
              className="tf-progress-fill"
              style={{ 
                width: `${(task.subtasks.filter(s => s.done).length / task.subtasks.length) * 100}%` 
              }}
            />
          </div>
          <span>{task.subtasks.filter(s => s.done).length}/{task.subtasks.length}</span>
        </div>
      )}
      
      <div className="tf-task-tags">
        {task.tags.map((tag, i) => (
          <span key={i} className="tf-tag">{tag}</span>
        ))}
      </div>
      
      <div className="tf-task-footer">
        <div className="tf-task-assignee">
          <span className="tf-avatar">{task.assignee.avatar}</span>
          <span>{task.assignee.name}</span>
        </div>
        <div className="tf-task-due">
          <Calendar size={14} />
          <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </motion.div>
  );

  const KanbanColumn = ({ title, tasks, status, color }) => (
    <div className="tf-kanban-column">
      <div className="tf-column-header">
        <div className="tf-column-title">
          <span className="tf-column-dot" style={{ backgroundColor: color }} />
          <h3>{title}</h3>
          <span className="tf-column-count">{tasks.length}</span>
        </div>
        <button className="tf-add-task-btn" onClick={() => setShowNewTaskModal(true)}>
          <Plus size={18} />
        </button>
      </div>
      <div className="tf-column-tasks">
        <AnimatePresence>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="taskflow-app">
      {/* Header */}
      <header className="tf-header">
        <div className="tf-header-left">
          <Link to="/projetos" className="tf-back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div className="tf-logo">
            <Zap className="tf-logo-icon" />
            <span>TaskFlow</span>
          </div>
        </div>
        
        <div className="tf-header-center">
          <div className="tf-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="tf-header-right">
          {/* Pomodoro Timer */}
          <div className="tf-pomodoro">
            <div className="tf-pomodoro-time">{formatTime(pomodoroTime)}</div>
            <button 
              className={`tf-pomodoro-btn ${isPomodoroActive ? 'active' : ''}`}
              onClick={() => setIsPomodoroActive(!isPomodoroActive)}
            >
              {isPomodoroActive ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="tf-pomodoro-btn" onClick={resetPomodoro}>
              <RotateCcw size={16} />
            </button>
          </div>
          
          <button className="tf-icon-btn">
            <Bell size={20} />
            <span className="tf-badge">3</span>
          </button>
          
          <div className="tf-user-avatar">
            <span>👨‍💻</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="tf-main">
        {/* Sidebar */}
        <aside className="tf-sidebar">
          <nav className="tf-nav">
            <button className="tf-nav-item active">
              <LayoutGrid size={18} />
              <span>Dashboard</span>
            </button>
            <button className="tf-nav-item">
              <CheckCircle2 size={18} />
              <span>Minhas Tarefas</span>
            </button>
            <button className="tf-nav-item">
              <Calendar size={18} />
              <span>Calendário</span>
            </button>
            <button className="tf-nav-item">
              <BarChart3 size={18} />
              <span>Relatórios</span>
            </button>
            <button className="tf-nav-item">
              <Users size={18} />
              <span>Equipe</span>
            </button>
          </nav>
          
          <div className="tf-projects-section">
            <h4>Projetos</h4>
            {mockProjects.map(project => (
              <div key={project.id} className="tf-project-item">
                <span className="tf-project-dot" style={{ backgroundColor: project.color }} />
                <span className="tf-project-name">{project.name}</span>
                <span className="tf-project-count">{project.tasks}</span>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="tf-sidebar-stats">
            <div className="tf-stat">
              <span className="tf-stat-value">{tasks.length}</span>
              <span className="tf-stat-label">Total</span>
            </div>
            <div className="tf-stat">
              <span className="tf-stat-value">{doneTasks.length}</span>
              <span className="tf-stat-label">Concluídas</span>
            </div>
            <div className="tf-stat">
              <span className="tf-stat-value">
                {Math.round((doneTasks.length / tasks.length) * 100)}%
              </span>
              <span className="tf-stat-label">Progresso</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="tf-content">
          {/* Toolbar */}
          <div className="tf-toolbar">
            <div className="tf-toolbar-left">
              <h2>Minhas Tarefas</h2>
              <div className="tf-filters">
                <button 
                  className={`tf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Todas
                </button>
                <button 
                  className={`tf-filter-btn ${filter === 'todo' ? 'active' : ''}`}
                  onClick={() => setFilter('todo')}
                >
                  A Fazer
                </button>
                <button 
                  className={`tf-filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                  onClick={() => setFilter('in-progress')}
                >
                  Em Progresso
                </button>
                <button 
                  className={`tf-filter-btn ${filter === 'done' ? 'active' : ''}`}
                  onClick={() => setFilter('done')}
                >
                  Concluídas
                </button>
              </div>
            </div>
            
            <div className="tf-toolbar-right">
              <div className="tf-view-toggle">
                <button 
                  className={`tf-view-btn ${view === 'board' ? 'active' : ''}`}
                  onClick={() => setView('board')}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  className={`tf-view-btn ${view === 'list' ? 'active' : ''}`}
                  onClick={() => setView('list')}
                >
                  <List size={18} />
                </button>
              </div>
              
              <button className="tf-new-task-btn" onClick={() => setShowNewTaskModal(true)}>
                <Plus size={18} />
                <span>Nova Tarefa</span>
              </button>
            </div>
          </div>

          {/* Kanban Board */}
          {view === 'board' ? (
            <div className="tf-kanban">
              <KanbanColumn 
                title="A Fazer" 
                tasks={todoTasks} 
                status="todo" 
                color="#6b7280"
              />
              <KanbanColumn 
                title="Em Progresso" 
                tasks={inProgressTasks} 
                status="in-progress" 
                color="#6366f1"
              />
              <KanbanColumn 
                title="Concluído" 
                tasks={doneTasks} 
                status="done" 
                color="#10b981"
              />
            </div>
          ) : (
            <div className="tf-list-view">
              {filteredTasks.map(task => (
                <motion.div 
                  key={task.id}
                  className="tf-list-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedTask(task)}
                >
                  <button 
                    className={`tf-task-check ${task.status === 'done' ? 'done' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                  >
                    {task.status === 'done' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                  <span className="tf-task-priority-dot" style={{ backgroundColor: getPriorityColor(task.priority) }} />
                  <span className={`tf-list-title ${task.status === 'done' ? 'done' : ''}`}>
                    {task.title}
                  </span>
                  <span className="tf-list-project">{task.project}</span>
                  <span className="tf-list-due">
                    <Calendar size={14} />
                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="tf-list-assignee">{task.assignee.avatar}</span>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div 
            className="tf-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTask(null)}
          >
            <motion.div 
              className="tf-task-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="tf-modal-header">
                <div className="tf-modal-status">
                  <button 
                    className={`tf-task-check large ${selectedTask.status === 'done' ? 'done' : ''}`}
                    onClick={() => toggleTaskStatus(selectedTask.id)}
                  >
                    {selectedTask.status === 'done' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <span className={`tf-status-badge ${selectedTask.status}`}>
                    {selectedTask.status === 'todo' && 'A Fazer'}
                    {selectedTask.status === 'in-progress' && 'Em Progresso'}
                    {selectedTask.status === 'done' && 'Concluído'}
                  </span>
                </div>
                <div className="tf-modal-actions">
                  <button className="tf-icon-btn"><Edit3 size={18} /></button>
                  <button className="tf-icon-btn danger"><Trash2 size={18} /></button>
                  <button className="tf-close-btn" onClick={() => setSelectedTask(null)}>×</button>
                </div>
              </div>
              
              <h2 className="tf-modal-title">{selectedTask.title}</h2>
              <p className="tf-modal-description">{selectedTask.description}</p>
              
              <div className="tf-modal-meta">
                <div className="tf-meta-item">
                  <span className="tf-meta-label">Projeto</span>
                  <span className="tf-meta-value">{selectedTask.project}</span>
                </div>
                <div className="tf-meta-item">
                  <span className="tf-meta-label">Prioridade</span>
                  <span className="tf-meta-value" style={{ color: getPriorityColor(selectedTask.priority) }}>
                    {selectedTask.priority === 'high' && 'Alta'}
                    {selectedTask.priority === 'medium' && 'Média'}
                    {selectedTask.priority === 'low' && 'Baixa'}
                  </span>
                </div>
                <div className="tf-meta-item">
                  <span className="tf-meta-label">Data de Entrega</span>
                  <span className="tf-meta-value">
                    {new Date(selectedTask.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="tf-meta-item">
                  <span className="tf-meta-label">Responsável</span>
                  <span className="tf-meta-value">
                    {selectedTask.assignee.avatar} {selectedTask.assignee.name}
                  </span>
                </div>
              </div>
              
              {selectedTask.subtasks.length > 0 && (
                <div className="tf-modal-subtasks">
                  <h4>Subtarefas</h4>
                  {selectedTask.subtasks.map(subtask => (
                    <div key={subtask.id} className="tf-subtask">
                      <button className={`tf-subtask-check ${subtask.done ? 'done' : ''}`}>
                        {subtask.done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      </button>
                      <span className={subtask.done ? 'done' : ''}>{subtask.title}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="tf-modal-tags">
                {selectedTask.tags.map((tag, i) => (
                  <span key={i} className="tf-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Notice */}
      <div className="tf-demo-notice">
        <span>🎯 Demo Interativo - TaskFlow</span>
        <Link to="/projetos" className="tf-demo-link">Voltar ao Portfólio</Link>
      </div>
    </div>
  );
};

export default TaskFlow;
