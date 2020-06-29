/**
 * @ Author: Tim Koepsel
 * @ Create Time: 09.06.2020 07:19:32
 * @ Modified by: Tim Koepsel
 * @ Modified time: 16.06.2020 14:04:47
 * @ Description:
 */

 import { Request, Response, application } from "express";

 export abstract class RouteEndpoint
 {
    abstract HandleRequest(route: string, query: string, req: Request): Promise<any[] | any>;
 }