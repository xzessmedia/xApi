/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:51:49 
 * @Last Modified by:   Tim Koepsel 
 * @Last Modified time: 2019-06-29 12:51:49 
 */
import path from 'path';
import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';

export default function openapi(app, routes) {
    const apiSpecPath = path.join(__dirname, 'api.yml');
    app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpecPath));

    new OpenApiValidator({
    apiSpecPath,
    }).install(app);

    routes(app);
    app.use(errorHandler);
}