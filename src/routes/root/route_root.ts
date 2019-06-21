/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 11:06:50 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 12:21:40
 */
import { ApiEndpoint } from "../../core/base/ApiEndpoint";
import { ApiMethodTypes } from "../../core/base/Definitions";

export class ApiRoute_Root extends ApiEndpoint {
    constructor() {
        super(ApiMethodTypes.GET, "/", {});
        
    }
    OnRouteAccess(request: any, response: any) {
        response.send("Route / has been accessed");
        console.log("Route / has been accessed");
    }
}