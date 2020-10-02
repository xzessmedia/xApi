/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 01.09.2020 12:50:00
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 01.09.2020 16:15:29
 * @ Description:
 */

import BasicFilter from "../basicfilter";
import { ApiFilter } from "../../models/apifilter";
import { filter } from "bluebird";


 export default class DateFilter extends BasicFilter {
     constructor(basequery: string, filter: ApiFilter) {
         super(basequery,filter);
     }

    ApplyFilter(query: string): string {
        return query += ' WHERE';
    }
 }