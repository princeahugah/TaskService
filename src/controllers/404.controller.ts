import { Request, Response } from 'express';

export default (req: Request, res: Response): void => {
  res.status(404).json({}).end();
};
