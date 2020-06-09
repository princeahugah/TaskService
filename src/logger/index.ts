import config from 'config';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf((log) => {
  const part = `[${log.timestamp}] [${log.level}]`;
  if (log.direction === 'Inbound') {
    return `${part} - Inbound Message
  ---------------------------------------------
  ID: ${log.requestId}
  Method: ${log.method}
  Path: ${log.originalUrl}
  Query String: ${JSON.stringify(log.query)}
  Params: ${JSON.stringify(log.params)}
  Headers: ${JSON.stringify(log.headers)}
  Cookies: ${JSON.stringify(log.cookies)}
  Payload: ${JSON.stringify(log.body)}
  -------------------------------------`;
  }

  if (log.error) {
    return `${part} - ${log.message ? log.message : 'An error occurred'}
  ---------------------------------------------
  ID: ${log.requestId}
  Headers: ${JSON.stringify(log.headers)}
  Exception: ${log.error.stack}
  -------------------------------------`;
  }

  if (log.direction === 'Outbound') {
    return `${part} - Outbound Message
  ---------------------------------------------
  ID: ${log.requestId}
  Headers: ${JSON.stringify(log.headers)}
  HTTP Status: ${log.statusCode}
  Payload: ${JSON.stringify(log.payload)}
  -------------------------------------`;
  }

  return `[${log.timestamp}] [${log.level}] ${log.message}`;
});

export default createLogger({
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new DailyRotateFile({
      filename: config.get('log.filename') || 'file.log',
      dirname: config.get('log.directory'),
      level: config.get('log.level'),
      datePattern: config.get('log.datePattern'),
      zippedArchive: true,
      handleExceptions: true
    })
  ],
  exitOnError: false
});
