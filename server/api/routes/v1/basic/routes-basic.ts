/**
 * @ Author: Tim Koepsel
 * @ Create Time: 13.05.2020 10:10:47
 * @ Modified by: Tim Koepsel
 * @ Modified time: 29.06.2020 18:09:15
 * @ Description:
 */
import { Request, Response, application } from "express";
import passport = require("passport");
import BasicEndpoint from "../../../core/basicendpoint";
import ServiceTools from "../../../services/service-tools";

const express = require('express');
const api = express.Router();

let baseEP = new BasicEndpoint();

api.get('/helloworld', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Hello World'
    });
});


api.get('/logs', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    let response;
    if (req.query.limit) {
        response = await baseEP.HandleRequest('/logs',`SELECT * FROM requestlogs ORDER by Id desc ${ServiceTools.SQLPagination(req)}`, req);
    } else {
        response = await baseEP.HandleRequest('/logs',`SELECT * FROM requestlogs ORDER by Id desc LIMIT 50 `, req);
    }
    res.send(response);
});

module.exports = api;