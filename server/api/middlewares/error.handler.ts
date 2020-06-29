/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:52:44 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-07-15 14:35:49
 */
import { Request, Response, NextFunction } from 'express';


// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ 
    path: req.path,
    errors })
}

