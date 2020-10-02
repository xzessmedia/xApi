/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 14.09.2020 11:56:44
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 28.09.2020 13:59:28
 * @ Description:
 */


import * as mysql from 'mysql';
import * as cfg from '../cfg/config.json'
import { Log } from '../core/debug';
import { Response } from 'express';

export interface MysqlResult {
    results: any;
    fields: any;
    sqlerror?: MysqlError
}

export interface MysqlError {
    sqlerror: {
        code: string,
        errno: string,
        sqlMessage: string
    }
}

export interface IDBConnector {
    Query(sqlquery: string):Promise<MysqlResult|MysqlError>;
    QueryWithErrorResponse(sqlquery: string, res: Response);
}

/**
 * Base Connector
 *
 * @abstract
 * @class DatabaseConnector
 * @implements {IDBConnector}
 */
export default abstract class DatabaseConnector implements IDBConnector {
    _poolcfg_staging: mysql.PoolConfig;
    _poolcfg_production: mysql.PoolConfig;
    _pool_staging: mysql.Pool;
    _pool_production: mysql.Pool;

    constructor(configStaging: mysql.PoolConfig, configProduction: mysql.PoolConfig) {
        // If we test locally we have only one database and other credentials
        // if we are live, we want to seperate between production and stage

        if (cfg.localtestmode === false) {
            this._pool_staging = mysql.createPool(configStaging);
            this._pool_production = mysql.createPool(configProduction);
            this._poolcfg_staging = configStaging;
            this._poolcfg_production = configProduction;
        } else {
            this._pool_staging = mysql.createPool(cfg.database.mysql_localtest);
            this._pool_production = mysql.createPool(cfg.database.mysql_localtest);
            this._poolcfg_staging = cfg.database.mysql_localtest;
            this._poolcfg_production = cfg.database.mysql_localtest;
        }
        
    }

    /**
     * Runs a SQL Query
     *
     * @param {string} sqlquery
     * @returns {Promise<MysqlResult>}
     * @memberof DatabaseConnector
     */
    Query(sqlquery: string):Promise<MysqlResult> {
        return new Promise(async (resolve, reject) => {
            try {
                if (cfg.testmode === true) {
                    this._pool_staging.getConnection((err, connection) => {
                        if (err) {
                            Log("ERROR","Connection Problem: "+err);
                        } else {
                            Log("INFO","Executing Query: "+sqlquery);

                            connection.query(sqlquery, (error, results, fields) => {
                                if (error !== null) {
                                    reject({sqlerror: {
                                        code: error.code,
                                        errno: error.errno,
                                        sqlMessage: error.sqlMessage
                                    }});
                                }
                                connection.release();
                                resolve({
                                    results: results,
                                    fields: fields
                                });
                            });
                        }
                    }); 
                } else {
                    this._pool_production.getConnection((err, connection) => {
                        
                        if (err) {
                            Log("ERROR","Connection Problem: "+err);
                        } else {
                            Log("INFO","Executing Query: "+sqlquery);

                            connection.query(sqlquery, (error, results, fields) => {
                                if (error !== null) {
                                    reject({sqlerror: {
                                        code: error.code,
                                        errno: error.errno,
                                        sqlMessage: error.sqlMessage
                                    }});
                                }
                                connection.release();
                                resolve({
                                    results: results,
                                    fields: fields
                                });
                            });
                        }
                        
                    }); 
                }
            } catch (error) {
                reject({sqlerror: {
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage
                }});
            }
        });
    }

    /**
     * Runs a SQL Query and returns the SQL Response as HTTP Response
     *
     * @param {string} sqlquery SQL Query
     * @param {Response} res    Express Pointer
     * @returns
     * @memberof DatabaseConnector
     */
    async QueryWithErrorResponse(sqlquery: string, res: Response) {
        try {
            let result = await this.Query(sqlquery);
            return result.results;
        } catch (error) {
            res.status(400).send({sqlerror: error.sqlerror});

            Log("ERROR", `Error while executing Query(${sqlquery})`,error);
        }
    }
}