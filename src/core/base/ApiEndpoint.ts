

/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 11:07:26 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 12:53:05
 */
import { ApiMethodTypes } from './Definitions';
import { ApiService } from '../services/api.service';
import { Express } from 'express';

export abstract class ApiEndpoint {
    private _type: ApiMethodTypes;
    private _path: string;
    private _model: object;
    private _express: any;

    constructor(method: ApiMethodTypes, path: string, model: object) {
        this._path = path;
        this._model = model;
        this._type = method;
    }

    InitEndpoint(express: Express) {
        console.log('Initialising Endpoint: '+this._path);
        switch (this._type) {
            case ApiMethodTypes.GET:
                express.get( this._path, ( req: any, res: any ) => {
                    this.OnRouteAccess(req, res);
                } );
                break;
            case ApiMethodTypes.POST:
                express.post( this._path, ( req: any, res: any ) => {
                    this.OnRouteAccess(req, res);
                } );
                break;
            case ApiMethodTypes.PUT:
                express.put( this._path, ( req: any, res: any ) => {
                    this.OnRouteAccess(req, res);
                } );
                break;
            case ApiMethodTypes.PATCH:
                express.patch( this._path, ( req: any, res: any ) => {
                    this.OnRouteAccess(req, res);
                } );
                break;
            case ApiMethodTypes.DELETE:
                express.delete( this._path, ( req: any, res: any ) => {
                    this.OnRouteAccess(req, res);
                } );
                break;
        
            default:
                break;
        }
        console.log('Endpoint: '+this._path+ ' has been initialised..');
    }

    abstract OnRouteAccess(request: any, response: any): void;
}