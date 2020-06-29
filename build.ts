/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:53:02 
 * @Last Modified by:   Tim Koepsel 
 * @Last Modified time: 2019-06-29 12:53:02 
 */
import s from 'shelljs';
const config = require('./tsconfig.json');
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('server/common/api.yml', `${outDir}/common/api.yml`);
