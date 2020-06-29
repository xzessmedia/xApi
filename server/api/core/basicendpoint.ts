/**
 * @ Author: Tim Koepsel
 * @ Create Time: 16.06.2020 14:03:15
 * @ Modified by: Tim Koepsel
 * @ Modified time: 22.06.2020 06:58:47
 * @ Description:
 */

import { Request, Response, application } from "express";
import { RouteEndpoint } from "./endpoint";
import CoreData from "./database";
import { reject } from "async";
import { resolve } from "bluebird";
import * as config from '../cfg/config.json';
import ServiceLog from "../services/service-log";

export default class BasicEndpoint extends RouteEndpoint 
{
    async HandleRequest(route: string, query: string, req: Request): Promise<any[] | null> {
        if (config.debug == true) {
            console.log('Receiving Request to '+route);
        } 
        
        return new Promise(async (resolve, reject) => {
            try {
                ServiceLog.LogApiRequest(route, req);
                var result = await CoreData.Query(`
                    ${query}
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