
/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 11:05:40 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 12:54:03
 */
import { ApiRoute_Root } from './root/route_root';
import { ApiEndpoint } from '../core/base/ApiEndpoint';
import { Express } from 'express';

var routes: Array<ApiEndpoint> = [];

// Add Routes here
let ApiRoute_RootInstance = new ApiRoute_Root();
routes.push(ApiRoute_RootInstance);






export default ApiRoute_RootInstance;
export function InitRoutes(express: Express) {
    routes.forEach(element => {
        element.InitEndpoint(express);
    });
}
