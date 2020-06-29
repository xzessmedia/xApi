/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:51:53 
 * @Last Modified by:   Tim Koepsel 
 * @Last Modified time: 2019-06-29 12:51:53 
 */
import pino from 'pino';

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

export default l;
