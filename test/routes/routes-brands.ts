/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.08.2020 13:17:33
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 31.08.2020 15:23:58
 * @ Description:
 */

import 'mocha';
import Server from '../../server';

import * as config from '../../server/api/cfg/config.json'
import Helper from '../../server/api/core/helper';

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);
const expect = chai.expect;

describe(`${config.name} Manufacturer Routes`, function() {
    it('Endpoint reachable? [GET]/api/v1/datahub/manufacturers/?limit=5&offset=0', function(done) {
        chai.request(Server)
        .get('/api/v1/datahub/manufacturers/?limit=5&offset=0')
        .set('token', Helper.ExtractTokenFromConfig('Picard'))  // Extract Picard Token from config and add to request
        .end(function(err, res) {
        let t_data = JSON.parse(res.text);
        
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('Endpoint responds with array? [GET]/api/v1/datahub/manufacturers/?limit=5&offset=0', function(done) {
        chai.request(Server)
        .get('/api/v1/datahub/manufacturers/?limit=5&offset=0')
        .set('token', Helper.ExtractTokenFromConfig('Picard'))  // Extract Picard Token from config and add to request
        .end(function(err, res) {
        let t_data = JSON.parse(res.text);
        
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(t_data).to.be.an('array');
        expect(t_data.length).to.be.above(0)
        done();
        });
    });
});