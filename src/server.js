import path from 'path';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import uuidV4 from 'uuid/v4';
import passport from 'passport';

import passportStrategies from 'authentication/strategies';
import logger from 'tools/logger';
import config from 'config';
import router from 'router';

const app = express();

const RedisStoreConstructor = connectRedis(session);

const redisSessionOptions = {
  host: config.REDIS_SESSION_HOST,
  port: config.REDIS_SESSION_PORT,
  prefix: config.REDIS_SESSION_PREFIX,
  db: config.REDIS_SESSION_DB_INDEX,
  logErrors: logger.error,
};

const redisSessionStore = new RedisStoreConstructor(redisSessionOptions);

const redisSessionCookieOptions = {
  maxAge: config.COOKIE_MAX_AGE_IN_MILLISEC,
  secure: config.APP_ENV === 'production',
  httpOnly: true,
  sameSite: true,
  domain: 'bp.jstest.com',
};

const sessionMiddleware = () => (req, res, next) => {
  session({
    store: redisSessionStore,
    genid: () => uuidV4(),
    secret: config.REDIS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: config.APP_ENV === 'production' ? config.PROD_COOKIE : config.DEVELOPMENT_COOKIE,
    cookie: redisSessionCookieOptions,
  })(req, res, next);
};

const generateRequestId = (req, res, next) => {
  req.uId = uuidV4();
  next();
};

app.use(generateRequestId);

app.enable('trust proxy');

app.use(helmet());

morgan.token('id', req => req.uId);

morgan.format('customFormat', '":id" ":req[x-forwarded-for]" :remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ":referrer" ":user-agent"');

app.use(morgan('customFormat', {
  stream: logger.access,
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.text());

app.use(bodyParser.raw());

app.use(cookieParser());

app.use('/public/assets/js', express.static(path.join(__dirname, 'compiled')));

passportStrategies();

app.use(sessionMiddleware());

app.use(passport.initialize());

app.use(passport.session());

router(app);

app.listen(config.PORT, () => {
  logger.log('server:')('Listening on port %s', config.PORT);
});

app.use((err, req, res, next) => {
  logger.error('server:')(err.stack);
  res.status(500).send('Something broke!');
});
