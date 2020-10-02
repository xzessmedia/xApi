/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 24.08.2020 13:17:33
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 18.09.2020 13:20:08
 * @ Description:
 */

import 'mocha';
import Server from '../../server';

import * as config from '../../server/api/cfg/config.json'
import Helper from '../../server/api/core/helper';
import ServiceTools from '../../server/api/services/service-tools';

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);
const expect = chai.expect;

describe(`${config.name} Order Routes`, function() {
    it('Endpoint [POST]/api/v1/datahub/orders', function() {
        
        chai.request(Server)
        .post('/api/v1/datahub/orders/')
        .set('content-type', 'application/json')
        .set('token', Helper.ExtractTokenFromConfig('Picard'))  // Extract Picard Token from config and add to request
        .send({
            "CreatedAt": new Date().toISOString(),
            "OrderId": ServiceTools.DatetoTimestamp(new Date().toISOString()),
            "InvoiceNumber": 123456789,
            "InvoiceDate": ServiceTools.CreateSQLDateString(new Date().toISOString()),
            "PicardCustomerId": 0,
            "ShopCustomerId": 0,
            "ShopLoginId": 0,
            "ShopLoginEmail": "unit@test",
            "AddressDelivery": {
              "Country": "string",
              "State": "string",
              "City": "string",
              "Postcode": "string",
              "Street": "string",
              "Company": "string",
              "Firstname": "string",
              "Lastname": "string",
              "Phone": "string"
            },
            "AddressInvoice": {
              "Country": "string",
              "State": "string",
              "City": "string",
              "Postcode": "string",
              "Street": "string",
              "Company": "string",
              "Firstname": "string",
              "Lastname": "string",
              "Phone": "string"
            },
            "Currency": "EUR",
            "Language": "DE",
            "VatNumber": "string",
            "CarrierId": "string",
            "IsPDFDelivered": true,
            "DeliveryNote": "LAUNCHED FROM A UNIT TEST",
            "IsPaid": true,
            "PaymentMethod": "string",
            "TotalPaid": "2.5",
            "TotalShipping": "0.0",
            "OrderRows": [
              {
                "ProductId": 0,
                "ProductReference": "string",
                "ProductQuantity": 1,
                "Price": "2.5",
                "ProductSupplierReference": "string",
                "LineReferenceText": "string",
                "LinearLength": "string",
                "LinearDistanceFirstBore": "string",
                "LinearSymmetrical": 0
              }
            ],
            "ShopId": 0,
            "Reference": "string",
            "Comment": "string",
            "DiscountName": "string",
            "DiscountCode": "string",
            "DiscountValue": 0.0
          })
          .end(function(err, res) {
            let t_data = JSON.parse(res.text);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
          });
    })
});