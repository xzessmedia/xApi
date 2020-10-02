/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 14.09.2020 12:26:06
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 12:32:59
 * @ Description:
 */

import DatabaseConnector from "../databaseconnector";
import { MysqlError } from "mysql";
import * as mysql from 'mysql';
import * as cfg from '../../cfg/config.json'
import { Log } from '../../core/debug';

export default class MysqlConnector extends DatabaseConnector {
    constructor() {
        let configStaging = cfg.database.mysql_staging;
        let configProduction = cfg.database.mysql_production;
        
        super(configStaging, configProduction);
    }
}