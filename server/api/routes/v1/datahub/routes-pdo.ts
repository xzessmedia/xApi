/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.07.2020 17:24:24
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 31.08.2020 14:59:39
 * @ Description:
 */


import { Request, Response, application } from "express";
import passport = require("passport");
import BasicEndpoint from "../../../core/basicendpoint";
import { ApiPdoSettings } from "../../../models/apimodels";
import ServiceTools from "../../../services/service-tools";



const express = require('express');
const api = express.Router();
let baseEP = new BasicEndpoint();


api.get('/settings', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    if (req.body !== undefined) {
       
        try {
            let response;
            if (req.query.limit) {
                response = await baseEP.HandleRequest('/api/v1/datahub/pdo/settings',`SELECT * FROM pdo_settings LIMIT ${req.query.offset}, ${req.query.limit}`, req);
            } else {
                response = await baseEP.HandleRequest('/api/v1/datahub/pdo/settings',`SELECT * FROM pdo_settings LIMIT 50`, req);
            }
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({message: JSON.stringify(error)});
        }
    }
    
});

// api.post('/settings', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
//     if (req.body !== undefined) {
//         // First Check is Swagger Validation handeled by OpenApi
//         // Second Check for validation with transform
//         let t_req: ApiPdoSettings = req.body;

//         if (t_req !== null) {
//             try {
//                 let t_res = await baseEP.HandleRequest('/api/v1/datahub/pdo/settings', 
//                 `INSERT into pdo_settings  (
//                     CustomerId, 
//                     CustomerName, 
//                     CustomerKey, 
//                     PriceProfile, 
//                     IsSelection, 
//                     IsOccasion, 
//                     Localization, 
//                     CreatedAt, 
//                     ModifiedAt, 
//                     DeletedAt) VALUES (
//                         ${t_req.CustomerId}, 
//                         '${t_req.CustomerName}', 
//                         '${t_req.CustomerKey}', 
//                         ${t_req.PriceProfile}, 
//                         ${t_req.IsSelection === true ? 1 : 0}, 
//                         ${t_req.IsOccasion === true ? 1 : 0}, 
//                         '${t_req.Localization}', 
//                         '${ServiceTools.CreateSQLDateString(t_req.CreatedAt)}', 
//                         '${ServiceTools.CreateSQLDateString(t_req.ModifiedAt)}', 
//                         '${ServiceTools.CreateSQLDateString(t_req.DeletedAt)}')`, 
//                     req);

//                 if (t_res !== null) {
//                     res.status(200).send({message: "Data received"});
//                 }
//             } catch (error) {
//                 res.status(500).send({message: JSON.stringify(error)});
//             }

//         } else {
//             res.status(400).send({message: "wrong request"});
//         }
//     }
    
// });

module.exports = api;