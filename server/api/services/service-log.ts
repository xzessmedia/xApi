/*
 * @Author: Tim Koepsel 
 * @Date: 2020-02-13 09:25:47 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2020-02-13 14:11:09
 */
 import CoreData from "../core/database";
 import ServiceTools from "./service-tools";
 import { Request, Response, application } from "express";
 import { createWriteStream } from "fs";
 import { inspect } from "util";

/**
 * Main Service Class
 *
 * @class ServiceLog
 */
class ServiceLog {
    static LogRequest(req: Request, route = '/', appname = 'Picard Api') {
        this.Log('Received Api Request', req,'Request',appname,route);
    }

    static FileLog(filename: string, logobject: object) {
        var stream = createWriteStream(filename, {flags:'a'});
        stream.write(`${inspect(logobject)}`);
        stream.end();
    }
    static Log(message,debugobject={}, category='default', appname='unspecified', source='',) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await CoreData.Query(`
                INSERT INTO requestlog
                (\`RequestedAt\`,\`AccessedRoute\`,\`RemoteIP\`,\`Payload\`,\`ResponseTime\`)
                VALUES ('${ServiceTools.CreateSQLDateString(new Date().toISOString())}','${category}','${appname}','${source}', '${message}', '${inspect(debugobject)}');
                `);


                if (result !== undefined) {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    static LogApiRequest(route: string, req: Request) {
        return new Promise(async (resolve, reject) => {
            try {
                let t_payload = {
                    Parameters: req.params,
                    Body: req.body,
                    Url: req.url
                }
                var result = await CoreData.Query(`
                INSERT INTO requestlog
                (\`RequestedAt\`,\`AccessedRoute\`,\`User\`,\`RemoteIP\`,\`Token\`,\`Payload\`,\`ResponseTime\`)
                VALUES ('${ServiceTools.CreateSQLDateString(new Date().toISOString())}','${route}','${req.user.User}','${req.connection.remoteAddress}','${req.user.Token}','${JSON.stringify(t_payload)}', '${0}');
                `);


                if (result !== undefined) {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
 }

 export default ServiceLog;