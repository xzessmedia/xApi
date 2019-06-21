/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-21 09:41:27 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-21 11:57:22
 */
import * as apiconfig from "../../config/apiconfig.json";
import {createConnection, QueryError, RowDataPacket, OkPacket, Connection} from 'mysql2';

class DbMysql {

    private connection: Connection;
    
    constructor() {
        this.connection = createConnection(process.env['DB']);
    }

    BuildConnectionString() :string {
        return `mysql://${apiconfig.Database.Credentials.Username}:${apiconfig.Database.Credentials.Password}@${apiconfig.Database.Host}:${apiconfig.Database.Port}/${apiconfig.Database.DatabaseName}`
    }

    GetData(query: string): Promise<RowDataPacket[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err: QueryError, rows: RowDataPacket[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    Execute(query: string, values: Array<any>): Promise<OkPacket> {
        return new Promise((resolve, reject) => {
            this.connection.execute(query, values, (err: QueryError, result: OkPacket) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}