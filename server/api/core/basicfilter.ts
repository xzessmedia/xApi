/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 01.09.2020 11:05:49
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 17:07:20
 * @ Description:
 */

import { ApiFilter } from "../models/apifilter";
import { Debug } from "./debug";

export interface IFilterConditionPair {
    Key: string,
    Value: any,
    Selector: 'EQUAL' | 'LIKE' | 'Greater' | 'GreaterEqual' | 'Lower' | 'LowerEqual' | 'Before' | 'After',
    Type: 'AND' | 'OR'
}

/**
 * Converts Selector Condition to SQL Syntax
 *
 * @param {IFilterConditionPair} element
 * @returns
 */
function SwitchSelector(element: IFilterConditionPair) {
    switch (element.Selector) {
        case 'EQUAL':
            return '=';
        case 'LIKE':
            return 'LIKE'
        case 'Lower':
            return '<';
        case 'LowerEqual':
            return '<=';
        case 'Greater':
            return '>';
        case 'GreaterEqual':
            return '>=';
        case 'After':
            return '>';
        case 'Before':
            return '<';
        default:
            break;
    }
}

export default abstract class BasicFilter {

    _QueryString: string;
    _ProvidedFilter: ApiFilter;

    constructor(basequery: string, filter: ApiFilter) {
        this._QueryString = basequery;
        this._ProvidedFilter = filter;
    } 

    /**
     * Needs to be overwritten
     * Used if something should happen with the query
     * If not required, just return the query
     * returned string should be SQL Query!
     *
     * @abstract
     * @memberof BasicFilter
     */
    abstract ApplyFilter(query: string): string;

    private ParseWhere() {
        let t_where_statements = '';
        let t_where = [];
        let t_whereKeys = Object.keys(this._ProvidedFilter.where);

        t_whereKeys.forEach(element => {
            let value = this._ProvidedFilter.where[element];
            if (value === typeof(Number)) {
                t_where.push(`${element} = ${value}`);
            }
            if (value === typeof(String)) {
                t_where.push(`${element} = '${value}'`);
            }
            if (value === typeof(Boolean)) {
                t_where.push(`${element} = ${value === true ? 1 : 0}`);
            }
        });
    }


    /**
     * Main Build Filter Function
     * Returns SQL Query from Filter
     *
     * @returns {string}
     * @memberof BasicFilter
     */
    Build(): string {
        
        this._QueryString = this.ApplyFilter(this._QueryString);


        return this._QueryString;
    }

    static ApplyLimit(query: string, limit: number) : string {
        if (!limit) {
            limit = 50;
        }
        return `${query} LIMIT ${limit}`;
     }
     static ApplyOffset(query: string, offset: number) : string {
       if(!offset) {
           offset = 0;
       }
       return `${query} OFFSET ${offset}`;
     }
     static ApplyOrder(query: string, key: string, order: 'ASC'|'DESC') : string {
       return `${query} ORDER BY ${key} ${order}`;
     }
     static ApplyWhereFilter(query: string,  filterconditions: Array<IFilterConditionPair>) : string {
       let t_sql_where = 'WHERE '
       let t_and = [];
       let t_or = [];

       // First lets group filter queries into array
       filterconditions.forEach(element => {
           if (element.Type === 'AND') {
                switch (typeof(element.Value)) {
                    case 'string':
                        t_and.push(`${element.Key} ${SwitchSelector(element)} '${element.Value}'`);
                        break;
                    case 'number':
                        t_and.push(`${element.Key} ${SwitchSelector(element)} ${element.Value}`);
                        break;
                    case 'boolean':
                        t_and.push(`${element.Key} ${SwitchSelector(element)} ${element.Value === true ? 1:0}`);
                        break;
                
                    default:
                        t_and.push(`${element.Key} ${SwitchSelector(element)} '${element.Value}'`);
                        break;
                }
           }
           if (element.Type === 'OR') {
                switch (typeof(element.Value)) {
                    case 'string':
                        t_or.push(`${element.Key} ${SwitchSelector(element)} '${element.Value}'`);
                        break;
                    case 'number':
                        t_or.push(`${element.Key} ${SwitchSelector(element)} ${element.Value}`);
                        break;
                    case 'boolean':
                        t_or.push(`${element.Key} ${SwitchSelector(element)} ${element.Value === true ? 1:0}`);
                        break;
                
                    default:
                        t_or.push(`${element.Key} ${SwitchSelector(element)} '${element.Value}'`);
                        break;
                }
            }
       });
       
       // now build the sql string

       for (let index = 0; index < t_and.length; index++) {
            const element = t_and[index];
            
            if (index !== t_and.length-1) {
                t_sql_where += (element + ' AND ')
            } else {
                t_sql_where += element
            }
        }
       for (let index = 0; index < t_or.length; index++) {
            const element = t_or[index];
            
            if (index !== t_and.length-1) {
                t_sql_where += (element + ' OR ')
            } else {
                t_sql_where += element
            }
        }

       return `${query} ${t_sql_where}`;
     }
}