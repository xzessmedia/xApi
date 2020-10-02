/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Create Time: 19.08.2020 13:58:46
 * @ Modified by: Tim Koepsel <tim.koepsel@picard.de>
 * @ Modified time: 14.09.2020 15:49:07
 * @ Description:
 */
import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../../server';
import CoreData from '../../server/api/core/coredata';

 describe('Datahub Local checks', () => {

  it('Do we have Database Connection', async () => {
    
    let response = await CoreData.Query(`SELECT * from product LIMIT 10`);
        if (response.results.length > 0) {
            expect(response.results.length).to.be.gt(0);
        } else {
            console.log('Is Debug Mode disabled?')
        }
  });



 });