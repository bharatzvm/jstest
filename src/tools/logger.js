import winston from 'winston';
import path from 'path';
import fse from 'fs-extra';
import util from 'util';

import config from 'config';

fse.ensureDir(config.LOG_ROOT).catch((err) => {
  console.error(err);
  process.exit();
});

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const colors = {
  emerg: 'magenta',
  alert: 'yellow',
  crit: 'red',
  error: 'red',
  warn: 'red',
  notice: 'yellow',
  info: 'green',
  debug: 'blue',
};

const customWriter = (writerType, level) => (...id) => (...message) => writerType[level](...id, util.format(...message));

const customStream = (writerType, level) => ({
  write: (...message) => writerType[level](...message),
});

const generateLogger = (level, identifier, isConsole, isPersistent, env) => {
  const options = {
    colors,
    level,
    transports: [],
  };
  if (isConsole) {
    const consoleTransport = new winston.transports.Console({
      level: env[`CONSOLE_LOG_${identifier}${identifier ? '_' : ''}LEVEL`],
      handleExceptions: env.LOG_FALSE,
      colorize: env.LOG_TRUE,
    });
    options.transports.push(consoleTransport);
  }
  if (isPersistent) {
    const persistentTransport = new winston.transports.File({
      name: env[`FIlE_LOG_${identifier}${identifier ? '_' : ''}NAME`],
      level: env[`FILE_LOG_${identifier}${identifier ? '_' : ''}LEVEL`],
      filename: path.join(env.LOG_ROOT, env[`FILE_LOG_${identifier}${identifier ? '_' : ''}FILENAME`]),
      handleExceptions: env.LOG_FALSE,
      colorize: env.LOG_FALSE,
      maxsize: env[`LOG_FILE_${identifier}${identifier ? '_' : ''}SIZE`],
      tailable: env.LOG_TRUE,
      maxFiles: env[`LOG_FILE_${identifier}${identifier ? '_' : ''}COUNT`],
    });
    options.transports.push(persistentTransport);
  }
  return new winston.Logger(options);
};


const debugLogs = generateLogger('debug', 'DEBUG', config.LOG_DEBUG_CONSOLE, config.LOG_DEBUG_PERSISTENT, config);

const errorLogs = generateLogger('error', 'ERROR', config.LOG_ERROR_CONSOLE, config.LOG_ERROR_PERSISTENT, config);

const accessLogs = generateLogger('info', 'ACCESS', config.LOG_ACCESS_CONSOLE, config.LOG_ACCESS_PERSISTENT, config);

const apiLogs = generateLogger('info', 'API', config.LOG_API_CONSOLE, config.LOG_API_PERSISTENT, config);

const consoleLogs = new winston.Logger({
  levels,
  colors,
  exceptionsHandler: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(config.LOG_ROOT, config.FILE_LOG_EXCEPTION_FILENAME) }),
  ],
  transports: [
    new winston.transports.Console({
      level: config.CONSOLE_LOG_LEVEL,
      colorize: config.CONSOLE_LOG_COLOR,
    }),
  ],
});

const disableLoggingToConsole = () => {
  if (config.APP_ENV === 'production') return;
  if (consoleLogs.transports && consoleLogs.transports.console) consoleLogs.transports.console.silent = true;
  if (debugLogs.transports && debugLogs.transports.console) consoleLogs.transports.console.silent = true;
  if (errorLogs.transports && errorLogs.transports.console) consoleLogs.transports.console.silent = true;
  if (accessLogs.transports && accessLogs.transports.console) consoleLogs.transports.console.silent = true;
};

const customLogger = {
  debug: customWriter(debugLogs, config.CONSOLE_LOG_DEBUG_LEVEL),
  error: customWriter(errorLogs, config.CONSOLE_LOG_ERROR_LEVEL),
  api: customWriter(apiLogs, config.CONSOLE_LOG_API_LEVEL),
  log: customWriter(consoleLogs, config.CONSOLE_LOG_LEVEL),
  access: customStream(accessLogs, config.CONSOLE_LOG_ACCESS_LEVEL),
  testEnv: disableLoggingToConsole,
};

export default customLogger;
