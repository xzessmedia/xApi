/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 10:57:20 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 11:03:42
 */


 export class ApiService {
     private static _instance: ApiService;
     private expressinstance: any;

     constructor() {
         
     }

     static getInstance(): ApiService {
        if (!ApiService._instance) {
            ApiService._instance = new ApiService();
        }
        return ApiService._instance;
     }

     setExpressInstance(instance: any) {
         this.expressinstance = instance;
     }

     getExpressInstance() {
         return this.expressinstance;
     }
 }