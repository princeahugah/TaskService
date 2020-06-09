declare namespace Express {
  export interface Request {
    requestId?: number;
    payload?: any;
  }
}
