/*
 * @Author: Tim Koepsel 
 * @Date: 2019-03-14 12:10:50 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 12:54:42
 */
import express, { Router } from "express";
import { ApiRouter } from "./core/services/router.service";
import { ApiService } from "./core/services/api.service";
import * as apiconfig from "./config/apiconfig.json";
import * as routes from "./routes/routes";

 export class Main {
    private app = express();
    private port = apiconfig.AccessPort; // default port to listen

    constructor() 
    {
        var apiservice = ApiService.getInstance();
        apiservice.setExpressInstance(this.app);

        this.PrepareApi();
        this.StartServer();
    }

    PrepareApi() 
    {
        routes.InitRoutes(this.app);
    }

    StartServer() 
    {
       // start the express server
       this.app.listen( this.port,'0.0.0.0', () => {
           // tslint:disable-next-line:no-console
           console.log( `${apiconfig.ApiName} Api Server started at http://localhost:${ this.port }` );
       } );    
    }
 }


 
 

 
 
 
