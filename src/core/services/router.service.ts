/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 10:28:59 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 12:24:24
 */
import { ApiMethodTypes } from "../base/Definitions"
import { ApiService } from './api.service';

export class ApiRouter {

    static HandleEndpoint(path: string, method: ApiMethodTypes, action: (req: any, res: any) => void) {
        var apiservice = ApiService.getInstance();
        var expressInstance = apiservice.getExpressInstance();

        console.log('Initialising Endpoint: '+ path);
        
        switch (method) {
            case ApiMethodTypes.GET:
                expressInstance.get( path, ( req: any, res: any ) => {
                    action(req, res);
                } );
                break;
            case ApiMethodTypes.POST:
                expressInstance.post( path, ( req: any, res: any ) => {
                    action(req, res);
                } );
                break;
            case ApiMethodTypes.PUT:
                expressInstance.put( path, ( req: any, res: any ) => {
                    action(req, res);
                } );
                break;
            case ApiMethodTypes.PATCH:
                expressInstance.patch( path, ( req: any, res: any ) => {
                    action(req, res);
                } );
                break;
            case ApiMethodTypes.DELETE:
                expressInstance.delete( path, ( req: any, res: any ) => {
                    action(req, res);
                } );
                break;
        
            default:
                break;
        }
    }
 }