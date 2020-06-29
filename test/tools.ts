/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-29 12:59:13 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-11-21 17:03:46
 */

import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

// describe('Basic', () => {
//     it('Should Authorise with Developer Key'), () => {
//         request(Server)
//         .post('/api/v1/tools/crypt')
//         .set('token', 'xxxx')
//         .send({
//             "username": "",
//             "password": ""
//              })
//         .expect('Content-Type', /json/)
//         .expect(200);
//     };
// });