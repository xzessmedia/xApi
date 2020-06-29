/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:52:10 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2020-01-30 15:08:59
 */
import { Application } from 'express';
export default function routes(app: Application): void {
  app.use('/api/v1/basic/', require("./api/routes/v1/basic/routes-basic"));
};