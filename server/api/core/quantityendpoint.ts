/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.07.2020 16:55:28
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 12:56:05
 * @ Description:
 */

import { Request, Response, application } from "express";
import { RouteEndpoint } from "./endpoint";
import { reject } from "async";
import { resolve } from "bluebird";
import * as config from '../cfg/config.json';
import ServiceLog from "../services/service-log";
import { ApiProductQuantity } from "../models/apimodels";

export default class ProductQuantityEndpoint extends RouteEndpoint 
{

    OnInit() {}
    
    async HandleRequest(route: string, query: string, req: Request): Promise<any[] | null> {
        return new Promise(async (resolve, reject) => {
            try {
                ServiceLog.LogApiRequest(route, req);

                let _result = await this.GetConnection().Query(query);
                var result: Array<{
                    ProductId: number, 
                    ProductQty: number, 
                    CreatedAt: string, 
                    ModifiedAt: string, 
                    DeletedAt: string}> = _result.results;

        
                if (result !== undefined) {

                    // Transform Model
                    let t_result: Array<ApiProductQuantity> = [];
                    result.forEach(element => {
                        t_result.push({
                            ProductId: element.ProductId,
                            Quantity: element.ProductQty,
                            CreatedAt: element.CreatedAt,
                            ModifiedAt: element.ModifiedAt,
                            DeletedAt: element.DeletedAt
                        })
                    });

                    resolve(t_result);
                }
                 
            } catch (error) {
                reject(error);
            }
        });
    }
}