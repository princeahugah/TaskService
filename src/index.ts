#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import config from 'config';
import fs from 'fs';
import https from 'https';
import logger from './logger';
import app from './app';

const createLogDirectory = (): void => {
  if (!fs.existsSync(config.get('log.directory'))) {
    fs.mkdirSync(config.get('log.directory'));
  }
};

const openHttpsConnection = (_app: express.Application): void => {
  logger.debug('ssl is enabled');
  const options = {
    key: fs.readFileSync(process.env.PRIVATE_KEY as string),
    cert: fs.readFileSync(process.env.PUBLIC_KEY as string)
  };
  https.createServer(options, _app).listen(_app.get('port'), () => {
    logger.info(`Task Service Server listening on port ${_app.get('port' )} with pid ${process.pid}`);
  });
};

const openHttpConnection = (_app: express.Application): void => {
  logger.debug('ssl is disabled');
  _app.listen(_app.get('port'), () => {
    logger.info(`Task Service Server listening on port ${_app.get('port')} with pid ${process.pid}`);
  });
};

const publishApplication = (): void => {
  app.set('port', process.env.port);

  if (config.get('use_ssl')) {
    openHttpsConnection(app);
  } else {
    openHttpConnection(app);
  }
};

process.setMaxListeners(0);
createLogDirectory();
publishApplication();
