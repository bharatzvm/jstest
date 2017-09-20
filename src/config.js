import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.ENVIRONMENT,
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.APP_ENV,
  LOG_ROOT: process.env.LOG_ROOT,
  DEVELOPMENT_COOKIE: process.env.DEVELOPMENT_COOKIE,
  PROD_COOKIE: process.env.PROD_COOKIE,
  FILE_LOG_DEBUG_NAME: process.env.FILE_LOG_DEBUG_NAME,
  FILE_LOG_ERROR_NAME: process.env.FILE_LOG_ERROR_NAME,
  FILE_LOG_ACCESS_NAME: process.env.FILE_LOG_ACCESS_NAME,
  CONSOLE_LOG_LEVEL: process.env.CONSOLE_LOG_LEVEL,
  CONSOLE_LOG_DEBUG_LEVEL: process.env.CONSOLE_LOG_DEBUG_LEVEL,
  CONSOLE_LOG_ERROR_LEVEL: process.env.CONSOLE_LOG_ERROR_LEVEL,
  CONSOLE_LOG_ACCESS_LEVEL: process.env.CONSOLE_LOG_ACCESS_LEVEL,
  CONSOLE_LOG_COLOR: process.env.CONSOLE_LOG_COLOR === 'true',
  CONSOLE_LOG_ACCESS_COLOR: process.env.CONSOLE_LOG_ACCESS_COLOR === 'true',
  CONSOLE_LOG_DEBUG_COLOR: process.env.CONSOLE_LOG_DEBUG_COLOR === 'true',
  CONSOLE_LOG_ERROR_COLOR: process.env.CONSOLE_LOG_ERROR_COLOR === 'true',
  FILE_LOG_DEBUG_FILENAME: process.env.FILE_LOG_DEBUG_FILENAME,
  FILE_LOG_ERROR_FILENAME: process.env.FILE_LOG_ERROR_FILENAME,
  FILE_LOG_EXCEPTION_FILENAME: process.env.FILE_LOG_EXCEPTION_FILENAME,
  FILE_LOG_ACCESS_FILENAME: process.env.FILE_LOG_ACCESS_FILENAME,
  FILE_LOG_DEBUG_LEVEL: process.env.FILE_LOG_DEBUG_LEVEL,
  FILE_LOG_ERROR_LEVEL: process.env.FILE_LOG_ERROR_LEVEL,
  FILE_LOG_ACCESS_LEVEL: process.env.FILE_LOG_ACCESS_LEVEL,
  LOG_FALSE: process.env.LOG_FALSE === 'true',
  LOG_TRUE: process.env.LOG_TRUE === 'true',
  LOG_FILE_DEBUG_SIZE: process.env.LOG_FILE_DEBUG_SIZE,
  LOG_FILE_ERROR_SIZE: process.env.LOG_FILE_ERROR_SIZE,
  LOG_FILE_ACCESS_SIZE: process.env.LOG_FILE_ACCESS_SIZE,
  LOG_FILE_DEBUG_COUNT: process.env.LOG_FILE_DEBUG_COUNT,
  LOG_FILE_ERROR_COUNT: process.env.LOG_FILE_ERROR_COUNT,
  LOG_FILE_ACCESS_COUNT: process.env.LOG_FILE_ACCESS_COUNT,
  LOG_DEBUG_PERSISTENT: process.env.LOG_DEBUG_PERSISTENT === 'true',
  LOG_ERROR_PERSISTENT: process.env.LOG_ERROR_PERSISTENT === 'true',
  LOG_ACCESS_PERSISTENT: process.env.LOG_ACCESS_PERSISTENT === 'true',
  LOG_DEBUG_CONSOLE: process.env.LOG_DEBUG_CONSOLE === 'true',
  LOG_ERROR_CONSOLE: process.env.LOG_ERROR_CONSOLE === 'true',
  LOG_ACCESS_CONSOLE: process.env.LOG_ACCESS_CONSOLE === 'true',
  LOG_API_CONSOLE: process.env.LOG_API_CONSOLE === 'true',
  DEFAULT_API_CONTENT_TYPE: process.env.DEFAULT_API_CONTENT_TYPE,
  ZIVAME_API_ROOT_URL: process.env.ZIVAME_API_ROOT_URL,
  ZIVAME_API_VERSION_1: process.env.ZIVAME_API_VERSION_1,
  ZIVAME_API_VERSION_2: process.env.ZIVAME_API_VERSION_2,
  ZIVAME_API_SECRET_KEY: process.env.ZIVAME_API_SECRET_KEY,
  ZIVAME_API_SECRET_PASS: process.env.ZIVAME_API_SECRET_PASS,
  ZIVAME_API_CONTENT_TYPE: process.env.ZIVAME_API_CONTENT_TYPE,
  FILE_LOG_API_LEVEL: process.env.FILE_LOG_API_LEVEL,
  FILE_LOG_API_FILENAME: process.env.FILE_LOG_API_FILENAME,
  LOG_FILE_API_SIZE: process.env.LOG_FILE_API_SIZE,
  LOG_FILE_API_COUNT: process.env.LOG_FILE_API_COUNT,
  LOG_API_PERSISTENT: process.env.LOG_API_PERSISTENT,
  CONSOLE_LOG_API_LEVEL: process.env.CONSOLE_LOG_API_LEVEL,
  CONSOLE_LOG_API_COLOR: process.env.CONSOLE_LOG_API_COLOR === 'true',
  API_LOG_TIME: process.env.API_LOG_TIME === 'true',
  REDIS_SESSION_HOST: process.env.REDIS_SESSION_HOST,
  REDIS_SESSION_PORT: process.env.REDIS_SESSION_PORT,
  REDIS_SESSION_PREFIX: process.env.REDIS_SESSION_PREFIX,
  REDIS_SESSION_DISABLETTL: process.env.REDIS_SESSION_DISABLETTL === 'true',
  REDIS_SESSION_DB_INDEX: parseInt(process.env.REDIS_SESSION_DB_INDEX, 10),
  REDIS_SESSION_SECRET: process.env.REDIS_SESSION_SECRET,
  WEBPACK_BUILD_PATH: process.env.WEBPACK_BUILD_PATH,
  WEBPACK_DEVTOOL: process.env.WEBPACK_DEVTOOL,
  WEBPACK_BUILD_STATS: process.env.WEBPACK_BUILD_STATS,
  WEBPACK_PUBLIC_PATH: process.env.WEBPACK_PUBLIC_PATH,
};

export default config;
