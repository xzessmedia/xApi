/**
 * @ Author: Tim Koepsel
 * @ Create Time: 09.06.2020 07:19:32
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 28.09.2020 20:31:47
 * @ Description:
 */

 import { Request, Response, application } from "express";
 import * as mysql from 'mysql';
 import MysqlConnector from "./connectors/mysqlconnector";

 export interface IRequestResult<T> { 
    IsResult: boolean,
    IsError: boolean,
    Result: T[],
    Error: any
 }
 

 export abstract class RouteEndpoint
 {
    _database: MysqlConnector;
    
    constructor() {
      this._database = new MysqlConnector();
      this.OnInit();
    }

    abstract OnInit();

    /**
     * Get a pooled Database Connection
     *
     * @returns {MysqlConnector}
     * @memberof RouteEndpoint
     */
    GetConnection(): MysqlConnector {
       return this._database;
    }

    abstract HandleRequest(route: string, query: string, req: Request): Promise<any[] | any>;

 }