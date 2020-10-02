/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-27 15:11:25 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-27 15:13:10
 */
import * as cfg from  "../cfg/config.json";
import l from '../../common/logger';

 export function Debug(message: string) {
     if (cfg.debug === true) {
         l.debug(message);
     }
 }

 export function Log(messagetype: 'INFO' | 'ERROR' | 'WARNING' ,message: string, ...args:any[]) {
    switch (messagetype) {
        case 'INFO':
            l.info(message, args);
            break;
        case 'ERROR':
            l.error(message, args);
        case 'WARNING':
            l.warn(message, args);
        default:
            break;
    }
}


 export function Logger() {
     return l;
 }