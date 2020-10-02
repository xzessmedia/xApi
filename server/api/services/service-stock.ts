

/*
 * @Author: Tim Koepsel 
 * @Date: 2019-11-21 16:20:01 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-12-18 11:26:59
 */
 import moment from 'moment';
import CoreData from '../core/coredata';

class ServiceStock {
    static ProductIDFromCustomer(productid) {
        
        if (productid > 10000000) {
            console.log('> ProductIDFromCustomer = ' + productid);
            return Number(productid - 10000000);
            
        } else {
            console.log('< ProductIDFromCustomer = ' + productid);
            return (Number(productid))
        }
    }

    static ProductIDForCustomer(productid) {
        if (productid < 10000000) {
            return (Number(productid) + 10000000)
        } else {
            return (Number(productid));
        }
    }


    static async IsOccasion() {
        // Occasion
        var occasion = await CoreData.Query(`
        select * from products_info
        `);

        let datefrom = new Date(occasion[0].occ_gueltig_von);
        let dateto = new Date(occasion[0].occ_gueltig_bis);
        let today = moment(new Date());
        return today.isBetween(datefrom, dateto);
    }

    static GetSchemaForVerpackung(productid=null, quantity=null, price=null, currency=null,packingtype=null,packingcode=null,packingsize=null,brand=null,item=null) {
        return {
            ProductId: productid !== null? this.ProductIDForCustomer(productid) : null,
            Quantity: quantity,
            Price: price,
            Currency: currency,
            PackingType: packingtype,
            PackingCode: packingcode,
            PackingSize: packingsize,
            Brand: brand,
            Item: item
        }
    }

    static FilterQuery(route, filter) {
        return `${route}?filter=${encodeURI(JSON.stringify(filter))}`;
    }

}

export default ServiceStock;