/**
 * @ Author: Tim Koepsel
 * @ Create Time: 12.06.2020 14:35:53
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 13:01:50
 * @ Description:
 */
import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import os from 'os';
import cookieParser from 'cookie-parser';
import * as config from '../api/cfg/config.json';

import installValidator from './openapi';

import l from './logger';
import passport = require('passport');
import { BasicStrategy } from 'passport-http';
import Helper from '../api/core/helper';
import multer from 'multer';
var UniqueTokenStrategy = require('passport-unique-token').Strategy;
var cors = require('cors');
const fs = require('fs');
const app = express();
const shell = require('shelljs')
const getRawBody = require("raw-body");

// Toggle Https / Http
const useSSL: boolean = false;


export function customHeaders(req, res, next) {
  app.disable('x-powered-by');
  res.setHeader('X-Powered-By', `${config.name} V.${config.version}`);
  next();
}


export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(customHeaders);
    app.use(cors());
    app.use(bodyParser.raw({type: 'application/octet-stream', limit : '10000kb'}))
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '10000kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '10000kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(multer({dest: config.uploads}).single('file'));
    app.use(async (req, res, next) => {
      if (req.headers["content-type"] === "application/octet-stream") {
          req.body = await getRawBody(req);
      }
      next()
    })


    /*
    * Temporary we use a static Token Key
    * until Auth Server is ready for usage
    */
    passport.use(new UniqueTokenStrategy(
      (token, done) => {
        let auth = Helper.CheckAuth(token, done);
        if (auth == false) {
          return done(null, false);
        } else {
          return done(null,auth);
        }
      }
    ));


  }

  router(routes: (app: Application) => void): ExpressServer {
    installValidator(app, routes)
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = port => () => {
      console.log(`*********************************************\n${String(config.name).toUpperCase()} API SERVICE`);
      console.log('Port: '+port);
      if (config.localtestmode === false) {
        if (config.ssl.useSSL) {
          console.log('secured with SSL (https)');
          console.log(`https://${config.publicurl}:${port}`);
        } else {
          console.log('unsecured without SSL (http)');
          console.log(`http://${config.publicurl}:${port}`);
        }
      } else {
          console.log('****   Developer Mode   ****');
          console.log('unsecured without SSL (http)');
          console.log('http://localhost:'+port);
      }
      console.log('*********************************************');
      l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    }

    if (config.localtestmode === true) {
      http.createServer(app).listen(p, welcome(p));
    } else {
      if (config.ssl.useSSL == true) {
        // Setup SSL
        const options = {
          key: fs.readFileSync(config.ssl.key),
          cert: fs.readFileSync(config.ssl.crt)
        };
        https.createServer(options,app).listen(p,welcome(p));
      } else {
        http.createServer(app).listen(p, welcome(p));
      }
    }

    
    return app;
  }
}
