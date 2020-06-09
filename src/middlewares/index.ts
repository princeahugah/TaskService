import express, { Application, Request, Response, NextFunction } from 'express';
import config from 'config';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import logger from './logger';
import winsLogger from '../logger';
import LogIdGenerator from '../utils/log-id-generator';

const corsOptions: CorsOptions = {
  allowedHeaders: JSON.parse(process.env.CORS_ALLOWED_HEADERS as string),
  exposedHeaders: JSON.parse(process.env.CORS_EXPOSED_HEADERS as string),
  methods: JSON.parse(process.env.CORS_METHODS as string),
  credentials: true,
  origin(origin, callback) {
    const whitelist = JSON.parse(process.env.CORS_ORIGIN_WHITELIST as string);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Route is not allowed by CORS: ' + origin));
    }
  }
};

export default (app: Application): void => {
  winsLogger.debug('Setting up middlewares');
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.requestId = LogIdGenerator.getId();

    res.on('finish', () => {
      logger.response(req, res);
    });
    next();
  });
  app.use(cookieParser(process.env.AUTH_SECRET));
  app.use(express.json({ limit: config.get('request_body.limit') }));
  app.use(
      express.urlencoded( { limit: config.get('request_body.limit'), extended: config.get('request_body.extended') })
  );
  app.use(logger.request);

  app.use(helmet());
  app.use(responseTime({ digits: 3 }));
  app.use(cors(corsOptions));
  app.use(
      cors((req, callback) => {
        const whitelist = JSON.parse(process.env.CORS_ORIGIN_WHITELIST as string);
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
        // reflect (enable) the requested origin in the CORS response
          corsOptions.origin = true;
        } else {
          corsOptions.origin = false; // disable CORS for this request
        }
        // callback expects two parameters: error and options
        callback(null, corsOptions);
      })
  );
};
