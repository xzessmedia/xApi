

/*
 * @Author: Tim Koepsel 
 * @Date: 2019-12-18 10:38:50 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2020-02-13 09:25:38
 */

import CoreData from "../core/coredata";


 class ServiceTools {
     static GetMutterForProductId(productid: string) {
         return new Promise(async (resolve, reject) => {
            try {
                let q1 = await CoreData.Query(`SELECT muttervarnr FROM products_stock where productid =${productid}`);
                resolve(q1);
            } catch (error) {
                reject(error);
            }
         });
     }

     static TransformResultSet<T>(values: any[]): T[] {
        return <T[]> values;
     }

     static TransformResult<T>(value: any): T {
        return <T> value;
     }

     static CreateSQLDateString(date: string) {
         return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
     }

    static DatetoTimestamp(strDate: string){
        let date = Date.parse(strDate);
        return date/1000;
       }

     static async asyncForEach(array: Array<any>, callback: any) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
 }

 export default ServiceTools;