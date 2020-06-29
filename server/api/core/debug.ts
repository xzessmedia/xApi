/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-27 15:11:25 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-27 15:13:10
 */
import * as cfg from  "../cfg/config.json";

 export function Debug(message: string) {
     if (cfg.debug === true) {
         console.log('[Debug]: '+ message);
     }
 }