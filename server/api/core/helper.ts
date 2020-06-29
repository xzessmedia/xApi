/**
 * @ Author: Tim Koepsel
 * @ Create Time: 23.06.2020 11:28:42
 * @ Modified by: Tim Koepsel
 * @ Modified time: 23.06.2020 13:06:16
 * @ Description:
 */

 import * as config from '../cfg/config.json';

class Helpers {
    CheckAuth(token: any, done: any) {
        let result:boolean | object = false;

        config.apikeys.forEach((key) => {
            if (key.Key === token) {
                console.log("Authorized Access: "+key.Key);
                result = {User: key.User, Token: key.Key};
            }
        });
        // If no auth found, invalidate
        console.log("Unauthorized Access (Token): "+token);
        //return done(null, false);

        return result;
    }
    ExtractKeyFromConfig(keyname: string) {
        config.apikeys.forEach((key) => {
            if (key.User === keyname) {
                return key;
            }
        });
    }
}

const Helper = new Helpers();
export default Helper;