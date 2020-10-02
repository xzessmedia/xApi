/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.07.2020 17:24:24
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 12:58:05
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
import { ApiProduct } from "../../../models/apimodels";
import ProductQuantityEndpoint from "../../../core/quantityendpoint";
import * as config from '../../../cfg/config.json';
import multer from 'multer';
import CoreData from "../../../core/coredata";



const express = require('express');
const api = express.Router();
const authentication = new AuthService('picard.de', '081a6065-66f5-433e-9d05-0d93fb4e1feb', 'yIVt0wt8WdcNPJUFbigHcf9x8RY4foZNCoipL0JEUO4','', '')
const auth = authentication.Authenticate();
let baseEP = new BasicEndpoint();
let productEP = new ProductEndpoint();
let qtyEP = new ProductQuantityEndpoint();


const upload = multer({dest: config.uploads});

api.post('/uploads/files', passport.authenticate('token', {session:false}),upload.single('file'), async (req: Request, res: Response) => {
    const uploadedFile  = req.file;
    console.log('Receiving File: '+ JSON.stringify(req.file));
    try {
        const filetype = req.query.filetype;
        const additional = req.query.additionaldata;
        ServiceLog.LogApiRequest('/api/v1/datahub/uploads/files', req);
        if (uploadedFile !== undefined) {
            let response: any = await CoreData.Query(`
            INSERT into files 
            (UploadedAt, OriginalFilename, EncodingInfo, MimeType, Size, StorageDestination, Filename, Path, Type, AdditionalData) 
            VALUES ('${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${uploadedFile.originalname}', '${uploadedFile.encoding}', '${uploadedFile.mimetype}', '${uploadedFile.size}', '${uploadedFile.destination}', '${uploadedFile.filename}','${uploadedFile.path}', '${filetype}', '${additional}')
            `);
            
            if (response && response.insertId) {
                res.status(200).json({message: 'Upload successful, FileId is required to associate File, store it on your side', FileId: response.insertId});
            } else {
                res.status(500).json({message: 'Could not save file data'});
            }
        } else {
            res.status(400).json({message: `No file uploaded.. add file with key 'file' to your request`});
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

api.get('/downloads/files/id/:fileid', passport.authenticate('token', {session:false}), async (req, res: Response) => {

    try {
        const FileId = req.params.fileid;
        ServiceLog.LogApiRequest('/api/v1/datahub/uploads/files/'+FileId, req);
        
        if (FileId) {
            let t_res = await CoreData.Query(`
            SELECT * from files WHERE Id=${FileId}
            `);

            if (t_res) {
                console.log('Result: '+ JSON.stringify(t_res));
                res.status(200).download('../uploads/' + t_res[0].Filename, t_res[0].OriginalFilename);
            } else {
                res.status(400).json({message: 'no data received from database'});
            }
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

api.get('/downloads/files/name/:filename', passport.authenticate('token', {session:false}), async (req, res: Response) => {

    try {
        const FileId:string = req.params.filename;
        ServiceLog.LogApiRequest('/api/v1/datahub/uploads/files/'+FileId, req);
        
        if (FileId) {
            let t_res = await CoreData.Query(`
            SELECT * from files WHERE OriginalFilename='${FileId}'
            `);

            if (t_res) {
                console.log('Result: '+ JSON.stringify(t_res));
                res.status(200).download('../uploads/' + t_res[0].Filename, t_res[0].OriginalFilename);
            } else {
                res.status(400).json({message: 'no data received from database'});
            }
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
    
});

module.exports = api;