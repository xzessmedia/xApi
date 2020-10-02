/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 14.09.2020 12:57:18
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 12:57:44
 * @ Description:
 */

import MysqlConnector from "./connectors/mysqlconnector";

const CoreData = new MysqlConnector();
export default CoreData;