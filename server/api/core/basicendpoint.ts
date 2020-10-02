/**
 * @ Author: Tim Koepsel
 * @ Create Time: 16.06.2020 14:03:15
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 29.09.2020 14:54:37
 * @ Description:
 */

import { Request, Response, application } from "express";
import { RouteEndpoint, IRequestResult } from "./endpoint";
import { reject } from "async";
import { resolve } from "bluebird";
import * as config from '../cfg/config.json';
import ServiceLog from "../services/service-log";
import DatabaseConnector from "./databaseconnector";
import MysqlConnector from "./connectors/mysqlconnector";

export default class BasicEndpoint extends RouteEndpoint 
{

    OnInit() {}

    CleanQuery(query: string) {
        var str2 = query.replace(/\n|\r/g, "");
        return str2.trim();
    }
    
    async HandleRequestWithErrorResponse(route: string, query: string, req: Request, res: Response): Promise<any[] | null> {  
        return new Promise(async (resolve, reject) => {
            try {
                ServiceLog.LogApiRequest(route, req);

                console.log(`QUERY: ${JSON.stringify(this.CleanQuery(query))}`);
                
                var result = await this.GetConnection().QueryWithErrorResponse(`
                    ${this.CleanQuery(query)}
                `,res);
        
                if (result !== undefined && Array.isArray(result) == true && result.length > 0) {
                    resolve();
                } 
                 
            } catch (error) {
                res.status(400).send({message: JSON.stringify(error)});
                reject(error);
            }
        });
    }

    async HandleRequest(route: string, query: string, req: Request): Promise<IRequestResult<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                ServiceLog.LogApiRequest(route, req);
                var result = await this.GetConnection().Query(`
                    ${query}
                `);
        
                resolve({
                    IsResult: true,
                    Result: result.results,
                    Error: null,
                    IsError: false
                });
                 
            } catch (error) {
                reject({
                    IsResult: false,
                    Result: null,
                    Error: error,
                    IsError: true
                });
            }
        });
    }

    async HandleRequestTransformed<T>(route: string, query: string, req: Request): Promise<IRequestResult<T[]>> {
        return new Promise(async (resolve, reject) => {
            try {
                ServiceLog.LogApiRequest(route, req);
                var result = await this.GetConnection().Query(`
                    ${query}
                `);
        
                resolve({
                    IsResult: true,
                    Result: result.results,
                    Error: null,
                    IsError: false
                });
                 
            } catch (error) {
                resolve({
                    IsResult: false,
                    Result: null,
                    Error: error,
                    IsError: true
                });
            }
        });
    }
}