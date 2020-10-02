/**
 * @ Author: Tim Koepsel
 * @ Create Time: 23.06.2020 11:28:42
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 24.08.2020 13:41:08
 * @ Description:
 */

 import * as config from '../cfg/config.json';
import { Log } from './debug';

export default class Helper {
    static CheckAuth(token: any, done: any) {
        let result:boolean | object = false;
        let hasFound = false;
        
        config.apikeys.forEach((key) => {
            if (key.Key === token) {
                
                Log("INFO", "Authorized Access",key.Key);
                result = {User: key.User, Token: key.Key};
                hasFound = true;
            }
        });
        // If no auth found, invalidate
        if (hasFound == false) {
            Log("WARNING", "Unauthorized Access",token);
        }

        return result;
    }
    static ExtractKeyFromConfig(keyname: string) {
        config.apikeys.forEach((key) => {
            if (key.User === keyname) {
                return key;
            }
        });
    }

    static ExtractTokenFromConfig(keyname: string) {
        let response;
        config.apikeys.forEach((key) => {
            if (key.User === keyname) {
                response = key.Key;
            }
        });
        return response;
    }
}