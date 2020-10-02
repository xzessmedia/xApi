/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 19.08.2020 14:44:01
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 31.08.2020 15:07:59
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


 describe(`${config.name} Product Routes`, function() {

  it('Endpoint [GET]/api/v1/datahub/products/', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/lineartech/', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/lineartech/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/quantities', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/quantities/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/quantities/lineartech/', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/quantities/lineartech/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/categories', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/categories/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/prices/ekugellager', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/prices/ekugellager/?limit=5&offset=0')
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

  it('Endpoint [GET]/api/v1/datahub/products/prices/pdo', function(done) {
    chai.request(Server)
    .get('/api/v1/datahub/products/prices/pdo/?limit=5&offset=0')
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