/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:52:03 
 * @Last Modified by:   Tim Koepsel 
 * @Last Modified time: 2019-06-29 12:52:03 
 */
import './common/env';
import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT);
export default new Server()
  .router(routes)
  .listen(port);
