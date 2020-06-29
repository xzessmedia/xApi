/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-27 13:43:08 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-11-21 17:21:42
 */

import * as mysql from 'mysql';
import * as cfg from '../cfg/config.json'
import { Debug } from '../core/debug';

var Pool = mysql.createPool(cfg.database.mysql);
var PoolTest = mysql.createPool(cfg.database.mysql_test);

export interface MysqlResult {
    results: any;
    fields: any;
}

export class Database {

    Connect(): Promise<mysql.Connection> {
        return new Promise((resolve, reject) => {
            try {
                Debug("Creating new Database connection");
                var connection = mysql.createConnection(cfg.database.mysql);

                connection.connect((err: mysql.MysqlError, args: any[]) => {
                    if (err) {
                        reject(err);
                    }
                    if(args.length > 0) {
                        resolve(connection);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    Disconnect(connection: mysql.Connection) {
        Debug("Closing Database connection");
        return new Promise((resolve, reject) => {
            connection.destroy();
            connection = null;
            
        });
    }

    QueryAsync(sqlquery: string, testmode=false): Promise<MysqlResult> {
        testmode = cfg.debug;   // Set to local servers if debug = true in config

        if (testmode === false) {
            return new Promise(async (resolve, reject) => {
                try {
                    Pool.getConnection((err, connection) => {
                        Debug("Executing Query: "+sqlquery);
                        connection.query(sqlquery, (error, results, fields) => {
                            if (error !== null) {
                                reject(error);
                            }
                        Debug("Releasing Connection");
                            connection.release();
                            resolve({
                                results: results,
                                fields: fields
                            });
                        });
                    });  
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new Promise(async (resolve, reject) => {
                try {
                    PoolTest.getConnection((err, connection) => {
                        Debug("Executing Query: "+sqlquery);
                        connection.query(sqlquery, (error, results, fields) => {
                            if (error !== null) {
                                reject(error);
                            }
                        Debug("Releasing Connection");
                            connection.release();
                            resolve({
                                results: results,
                                fields: fields
                            });
                        });
                    });  
                } catch (error) {
                    reject(error);
                }
            });
        }
    }

    async Query(sqlquery: string, testmode=false): Promise<any[]> {

        try {
            var result = await this.QueryAsync(sqlquery, testmode);
            return result.results;
        } catch (error) {
            console.log(error);
        }
        
    }
}

var CoreData = new Database();

export default CoreData;