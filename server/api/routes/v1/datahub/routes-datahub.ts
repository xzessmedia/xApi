/**
 * @ Author: Tim Koepsel
 * @ Create Time: 13.05.2020 10:10:47
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 29.09.2020 16:41:44
 * @ Description:
 */
import { Request, Response, application } from "express";
import passport = require("passport");
import ServiceTools from "../../../services/service-tools";
import ServiceLog from "../../../services/service-log";
import cookieParser from 'cookie-parser';
import { AuthService } from "../../../services/service-auth";
import BasicEndpoint from "../../../core/basicendpoint";
import { ApiOrderElement } from "../../../models/apimodels";
import CoreData from "../../../core/coredata";
import { Log, Debug } from "../../../core/debug";

const express = require('express');
const api = express.Router();

let baseEP = new BasicEndpoint();

/**
 *  Route /api/v1/datahub/manufacturers
 *  See https://datahub.picard.de:3500/#/Datahub/Receive%20Manufacturer%20List
 * 
 */

api.get('/manufacturers', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    let response;
    if (req.query.limit) {
        response = await baseEP.HandleRequest('/manufacturers',`SELECT * FROM manufacturer ORDER by ManufacturerId asc LIMIT ${req.query.offset}, ${req.query.limit}`, req);
    } else {
        response = await baseEP.HandleRequest('/manufacturers',`SELECT * FROM manufacturer ORDER by ManufacturerId LIMIT 50 `, req);
    }
    res.send(response);
});

/**
 *  Route /api/v1/datahub/orders
 *  See https://datahub.picard.de:3500/#/Work%20in%20Progress/Post%20Orders%20from%20PDO%20Portal
 * 
 */

api.post('/orders', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    let response;
    let insert_sql = ''; //`SET autocommit = 0; START TRANSACTION; \n`;
    let errors = '';
    let hasError = false;

    await CoreData.Query(`SET autocommit=0`);
    await CoreData.Query(`START TRANSACTION`);

    // Process Details first to avoid missing records caused by other processes like syncing at the same time
    let order_row: any[] = req.body.OrderRows;
    let t_index = 0;
    await ServiceTools.asyncForEach(order_row, async (row: ApiOrderElement) => {
        try {
            let t_insert_sql = 
            `INSERT into order_detail (
                OrderId,
                OrderRowId,
                ProductId,
                ProductReference,
                Quantity,
                Price,
                ProductSupplierReference,
                LineReferenceText,
                LinearLength,
                LinearDistanceFirstBore,
                LinearSymmetrical) VALUES (
                ${req.body.OrderId},
                ${t_index},
                ${row.ProductId},
                '${row.ProductReference}',
                ${row.ProductQuantity},
                ${row.Price},
                '${row.ProductSupplierReference}',
                '${row.LineReferenceText}',
                '${row.LinearLength}',
                '${row.LinearDistanceFirstBore}',
                ${row.LinearSymmetrical}
                ); `;

                let t_result = await baseEP.HandleRequest(`/api/v1/datahub/orders/`, t_insert_sql, req);

                t_index++;
        } catch (error) {
            console.log('OrderDetails has been processed but ran into errors: \n'+' | Row Index '+ t_index + '| Error: '+JSON.stringify(error)+'\n');
            errors += `${JSON.stringify(error)} | `;
            hasError = true;
        }
    });

    try {
        let t_insert_mastersql =
        `INSERT into order_master (
            OrderId, 
            InvoiceNumber,
            InvoiceDate,
            PicardCustomerId, 
            ShopCustomerId, 
            ShopId, 
            ShopLoginId, 
            ShopLoginEmail, 
            DeliveryCountry, 
            DeliveryState, 
            DeliveryCity, 
            DeliveryPostcode, 
            DeliveryStreet, 
            DeliveryCompany, 
            DeliveryFirstname, 
            DeliveryLastname, 
            DeliveryPhone, 
            InvoiceCountry, 
            InvoiceState, 
            InvoiceCity, 
            InvoicePostcode, 
            InvoiceStreet, 
            InvoiceCompany, 
            InvoiceFirstname, 
            InvoiceLastname, 
            InvoicePhone, 
            Currency, 
            CustomerLanguage, 
            VatNumber, 
            CarrierName, 
            StatePdfDelivery, 
            DeliveryNoteName, 
            StateIsPaid, 
            Payment, 
            TotalPaid, 
            TotalShipping, 
            Comments, 
            Reference, 
            CreatedAt, 
            ProcessedByErp, 
            DiscountCode, 
            DiscountName, 
            DiscountValue) VALUES (
            ${req.body.OrderId},    
            ${req.body.InvoiceNumber}, 
            '${ServiceTools.CreateSQLDateString(req.body.InvoiceDate)}', 
            ${req.body.PicardCustomerId}, 
            ${req.body.ShopCustomerId}, 
            ${req.body.ShopId}, 
            ${req.body.ShopLoginId},
            '${req.body.ShopLoginEmail}',
            '${req.body.AddressDelivery.Country}',
            '${req.body.AddressDelivery.State}',
            '${req.body.AddressDelivery.City}',
            '${req.body.AddressDelivery.Postcode}',
            '${req.body.AddressDelivery.Street}',
            '${req.body.AddressDelivery.Company}',
            '${req.body.AddressDelivery.Firstname}',
            '${req.body.AddressDelivery.Lastname}',
            '${req.body.AddressDelivery.Phone}',
            '${req.body.AddressInvoice.Country}',
            '${req.body.AddressInvoice.State}',
            '${req.body.AddressInvoice.City}',
            '${req.body.AddressInvoice.Postcode}',
            '${req.body.AddressInvoice.Street}',
            '${req.body.AddressInvoice.Company}',
            '${req.body.AddressInvoice.Firstname}',
            '${req.body.AddressInvoice.Lastname}',
            '${req.body.AddressInvoice.Phone}',
            '${req.body.Currency}',
            '${req.body.Language}',
            '${req.body.VatNumber}',
            '${req.body.CarrierId}',
            ${req.body.IsPDFDelivered == true ? 1 : 0},
            '${req.body.DeliveryNote}',
            ${req.body.IsPaid == true ? 1 : 0},
            '${req.body.PaymentMethod}',
            ${req.body.TotalPaid},
            ${req.body.TotalShipping},
            '${req.body.Comment}',
            '${req.body.Reference}',
            '${ServiceTools.CreateSQLDateString(req.body.CreatedAt)}',
            ${0},
            '${req.body.DiscountCode}',
            '${req.body.DiscountName}',
            ${req.body.DiscountValue}
            ); \n`;


            try {
                response = await baseEP.HandleRequest('/api/v1/datahub/orders/',
                t_insert_mastersql
                , req);


                if (response.IsError === true) {
                    hasError = true;
                    errors += ' | Error: '+JSON.stringify('Error while writing Master Record');
                    res.statusCode = 500;
                    await CoreData.Query(`ROLLBACK`);
                    res.send({message: 'Order had errors and be rollbacked', error: errors
                    });
                } else {
                    hasError = false
                }
        
            } catch (error) {
                hasError = true;
                errors += ' | Error: '+JSON.stringify(error);
                res.statusCode = 500;
                await CoreData.Query(`ROLLBACK`);
                res.send({message: 'Order has been received and processed with errors', error: errors});
            }
    } catch (error) {
        console.log('Error while preparing SQL COMMIT / Order Object', error);
        errors += ' | Error: '+JSON.stringify(error);
        hasError = true;
        await CoreData.Query(`ROLLBACK`);
    }

    if (hasError === true) {
        Log("ERROR", 'Error while receiving Order Object'+JSON.stringify(errors));
        await CoreData.Query(`ROLLBACK`);
        await CoreData.Query(`SET autocommit=1`);
        res.statusCode = 500;
        res.send({message: 'Order has been received with errors, doing rollback'});
    } else {
        await CoreData.Query(`COMMIT`);
        await CoreData.Query(`SET autocommit=1`);
        res.statusCode = 200;
        res.send({message: 'Order has been received'});
    }
    

    
   
    
    
});

module.exports = api;