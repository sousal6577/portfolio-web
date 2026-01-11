// ============================================================================
// LOGGER UTILITY - Sistema de logs coloridos e estruturados
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m'
};

const icons = {
  info: 'ℹ️ ',
  success: '✅',
  warning: '⚠️ ',
  error: '❌',
  debug: '🔍',
  database: '🗄️ ',
  api: '🌐',
  auth: '🔐',
  time: '⏱️ '
};

class Logger {
  constructor(context = 'APP') {
    this.context = context;
  }

  _timestamp() {
    return new Date().toISOString();
  }

  _format(level, icon, color, message, data = null) {
    const timestamp = this._timestamp();
    const prefix = `${color}[${timestamp}] [${this.context}] ${icon} ${level}:${colors.reset}`;
    
    if (data) {
      console.log(prefix, message);
      console.log(`${colors.dim}   └─ Data:${colors.reset}`, JSON.stringify(data, null, 2));
    } else {
      console.log(prefix, message);
    }
  }

  info(message, data = null) {
    this._format('INFO', icons.info, colors.blue, message, data);
  }

  success(message, data = null) {
    this._format('SUCCESS', icons.success, colors.green, message, data);
  }

  warn(message, data = null) {
    this._format('WARNING', icons.warning, colors.yellow, message, data);
  }

  error(message, data = null) {
    this._format('ERROR', icons.error, colors.red, message, data);
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      this._format('DEBUG', icons.debug, colors.magenta, message, data);
    }
  }

  database(message, data = null) {
    this._format('DATABASE', icons.database, colors.cyan, message, data);
  }

  api(method, path, statusCode = null, duration = null) {
    const status = statusCode 
      ? (statusCode < 400 ? `${colors.green}${statusCode}${colors.reset}` : `${colors.red}${statusCode}${colors.reset}`)
      : '';
    const time = duration ? `${colors.dim}(${duration}ms)${colors.reset}` : '';
    this._format('API', icons.api, colors.blue, `${method} ${path} ${status} ${time}`);
  }

  auth(message, data = null) {
    this._format('AUTH', icons.auth, colors.yellow, message, data);
  }

  // Request logger middleware
  requestLogger() {
    return (req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        this.api(req.method, req.originalUrl, res.statusCode, duration);
      });
      
      next();
    };
  }

  // Error logger middleware
  errorLogger() {
    return (err, req, res, next) => {
      this.error(`${req.method} ${req.originalUrl}`, {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
      next(err);
    };
  }
}

// Singleton instances for different contexts
const appLogger = new Logger('APP');
const dbLogger = new Logger('DATABASE');
const authLogger = new Logger('AUTH');
const apiLogger = new Logger('API');

module.exports = {
  Logger,
  appLogger,
  dbLogger,
  authLogger,
  apiLogger,
  default: appLogger
};
