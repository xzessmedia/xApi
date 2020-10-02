/**
 * @ Author: Tim Koepsel
 * @ Create Time: 13.05.2020 10:10:47
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 29.09.2020 10:17:50
 * @ Description:
 */
import { Request, Response, application } from "express";
import passport = require("passport");
import ServiceTools from "../../../services/service-tools";
import ServiceLog from "../../../services/service-log";
import cookieParser from 'cookie-parser';
import { AuthService } from "../../../services/service-auth";
import BasicEndpoint from "../../../core/basicendpoint";
import ProductEndpoint from "../../../core/productendpoint";
import { ApiProduct, ApiEkuPrice, ApiProductPrice, ApiLineartechProduct } from "../../../models/apimodels";
import ProductQuantityEndpoint from "../../../core/quantityendpoint";
import { forEachOf } from "async";
import { reject } from "bluebird";
import { Debug, Log } from "../../../core/debug";
import BasicFilter from "../../../core/basicfilter";

const express = require('express');
const api = express.Router();
const authentication = new AuthService('picard.de', '081a6065-66f5-433e-9d05-0d93fb4e1feb', 'yIVt0wt8WdcNPJUFbigHcf9x8RY4foZNCoipL0JEUO4','', '')
const auth = authentication.Authenticate();
let baseEP = new BasicEndpoint();
let productEP = new ProductEndpoint();
let qtyEP = new ProductQuantityEndpoint();

/**
 *  Route /api/v1/datahub/products/
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Product%20List
 * 
 */

api.get('/', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    
    let query = 'SELECT * FROM product'
    try {

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);
        
        
        Debug(`Query: ${JSON.stringify(query)}`)
        let requestresult = await productEP.HandleRequest('/products',query, req);

        res.send(requestresult);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

/**
 *  Route /api/v1/datahub/products/lineartech
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20LinearTech%20Product%20List
 * 
 */

api.get('/lineartech', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    try {
        let query = 'SELECT * FROM linear_master'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);
        
        let requestresult = await baseEP.HandleRequest('/products/lineartech',query, req);

        let data: any[] = requestresult.IsResult ? requestresult.Result : [];
        let combinedData: ApiLineartechProduct[] = [];

        await ServiceTools.asyncForEach(data, async(item) => {
            
            let details = await baseEP.HandleRequest('/products',`SELECT * FROM linear_detail WHERE LinearProductId=${item.LinearProductId}`, req);
            let t_data_result: any = details.IsResult ? details.Result : [];
            let t_data2 = t_data_result.Length > 0 ? t_data_result[0] : null;
            
            let t_data: ApiLineartechProduct = {
                ProductId: item.LinearProductId,
                Type: item.Type,
                Length: item.Length,
                MinLengthLeft: item.MinLengthLeft,
                MaxLengthLeft: item.MaxLengthLeft,
                LengthToHole: item.LengthToHole,
                Height: item.Height,
                Width: item.Width,
                HoleDiameter: item.HoleDia,
                Thread: item.Thread,
                NumberHoles: item.NumberHoles,
                Sketch: item.Sketch,
                SchemaFilter: item.SchemaFilter,
                Weight: item.Weight,
                Details: {
                    LengthOriginal: t_data2 !== null ? t_data2.LengthOriginal : null,
                    LengthInStock: t_data2 !== null ? t_data2.LengthInStock : null,
                    LengthLeft: t_data2 !== null ? t_data2.LengthLeft : null,
                    LengthRight: t_data2 !== null ? t_data2.LengthRight : null,
                    CreatedAt: t_data2 !== null ? t_data2.CreatedAt : null,
                    ModifiedAt: t_data2 !== null ? t_data2.ModifiedAt : null,
                    DeletedAt: t_data2 !== null ? t_data2.DeletedAt : null,
                },
                CreatedAt: item.CreatedAt,
                ModifiedAt: item.ModifiedAt,
                DeletedAt: item.DeletedAt
            };
            combinedData.push(t_data);
        });
        res.send(combinedData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

/**
 *  Route /api/v1/datahub/products/quantities/
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Product%20Quantity%20List
 * 
 */

api.get('/quantities', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    try {
        let query = 'SELECT * FROM product_qty'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);

        let requestresult = await baseEP.HandleRequest('/products/quantities',query, req);

        res.send(requestresult);

    } catch (error) {
        res.send(error);
    }
    
    
});

/**
 *  Route /api/v1/datahub/products/quantities/lineartech
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20LinearTech%20Product%20Quantities
 * 
 */

api.get('/quantities/lineartech', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    try {
        let query = 'SELECT * FROM linear_detail'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);

        let requestresult = await baseEP.HandleRequest('/products/quantities/lineartech',query, req);

        let t_data2: any[] = requestresult.IsResult ? requestresult.Result : [];
        let data: any[] = [];
        
        t_data2.forEach(element => {
            data.push({
                ProductId: element.LinearProductId,
                Details:{
                    LengthOriginal: element !== null ? element.LengthOriginal : null,
                    LengthInStock: element !== null ? element.LengthInStock : null,
                    LengthLeft: element !== null ? element.LengthLeft : null,
                    LengthRight: element !== null ? element.LengthRight : null,
                    CreatedAt: element !== null ? element.CreatedAt : null,
                    ModifiedAt: element !== null ? element.ModifiedAt : null,
                    DeletedAt: element !== null ? element.DeletedAt : null,
                }
            })
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

/**
 *  Route /api/v1/datahub/products/prices/ekugellager
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Product%20Price%20List%20Eku
 * 
 */

api.get('/prices/ekugellager', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
   let query = 'SELECT * FROM eku_price'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'DeletedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);

        let response = await baseEP.HandleRequest('/products/prices/ekugellager',query, req);
        let t_res = response.IsResult ? response.Result : [];
    // convert response
    let response_eku: ApiEkuPrice[] = [];
    t_res.map((value: any, index) => {
        response_eku.push({
            ProductId:  value.ProductId,
            Range: value.ProductRange,
            CreatedAt: value.CreatedAt,
            ModifiedAt: value.ModifiedAt,
            DeletedAt: value.DeltedAt
        });
    });

    res.send(response_eku);
});

/**
 *  Route /api/v1/datahub/products/prices/pdo
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Product%20Price%20Profiles
 * 
 */

api.get('/prices/pdo', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    let response;
    
    let query = 'SELECT * FROM product_price'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'DeletedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);

        response = await baseEP.HandleRequest('/products/prices/pdo',query, req);

    let response_pdo: ApiProductPrice[] = [];
    response.map((value: any, index) => {
        response_pdo.push({
            ProductId:  value.ProductId,
            PriceProfile: value.PriceProfile,
            Currency: value.Currency,
            ProductPrice: value.Price,
            ListPrice: value.ListPrice,
            FictiveListPrice: value.FictivePrice,
            OccasionPrice: value.OccasionPrice,
            SelectionPrice: value.SelectionPrice,
            CreatedAt: value.CreatedAt,
            ModifiedAt: value.ModifiedAt,
            DeletedAt: value.DeltedAt
        });
    });

    res.send(response_pdo);
});


/**
 *  Route /api/v1/datahub/products/{productid}/quantity/
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Quantity%20for%20ProductId
 * 
 */

api.get('/:productid/quantity', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    let query;
    try {
        if (req.query.limit) {
            query = await qtyEP.HandleRequest('/products',`SELECT * FROM product_qty WHERE ProductId='${req.params.productid}' LIMIT ${req.query.offset},${req.query.limit}`, req);
        } else {
            query = await qtyEP.HandleRequest('/products',`SELECT * FROM product_qty WHERE ProductId='${req.params.productid} LIMIT 50`, req);
        }



        
        res.send(query);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

api.get('/categories', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {

    let query = 'SELECT * FROM category'

        if(req.query.datefilter) {
            query = BasicFilter.ApplyWhereFilter(`${query}`, [
                {
                    Key: 'ModifiedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'CreatedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                },
                {
                    Key: 'DeletedAt',
                    Type: 'AND',
                    Selector: 'After',
                    Value: ServiceTools.CreateSQLDateString(req.query.datefilter)
                }
            ]);
        }
        query = BasicFilter.ApplyLimit(query, req.query.limit);
        query = BasicFilter.ApplyOffset(query, req.query.offset);

        let response = await baseEP.HandleRequestWithErrorResponse('/products/prices/pdo',query, req, res);


    res.send(response);
});

module.exports = api;