import Logger from '../logger';
import { Errback, Request, Response, NextFunction } from 'express';

export default {

  request: (req: Request, res: Response, next: NextFunction): void => {
    const headers = Object.assign({}, req.headers);
    if (req.headers.authorization) {
      headers.authorization = 'Bearer ********';
    }

    Logger.log({
      level: 'info',
      message: '',
      requestId: req.requestId,
      method: req.method,
      originalUrl: req.originalUrl,
      query: req.query,
      params: req.params,
      headers,
      cookies: req.cookies,
      body: req.body,
      direction: 'Inbound'
    });
    next();
  },


  error: (err: Errback, req: Request, res: Response, next: NextFunction): void => {
    Logger.log({
      level: 'error',
      message: '',
      requestId: req.requestId,
      headers: res.getHeaders(),
      error: err,
      direction: 'Outbound'
    });
  },


  response: (req: Request, res: Response): void => {
    if (req.payload && req.payload.accessToken) {
      req.payload = Object.assign(req.payload, { accessToken: '********' });
    }
    Logger.log({
      level: 'info',
      message: '',
      requestId: req.requestId,
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      payload: req.payload,
      direction: 'Outbound'
    });
  }
};
