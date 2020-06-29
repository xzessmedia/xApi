/*
 * @Author: Tim Koepsel 
 * @Date: 2019-06-26 12:20:19 
 * @Last Modified by: Tim Koepsel
 * @Last Modified time: 2019-06-28 11:17:12
 */

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'xApi',
      version: '1.0.0',
      description: 'REST Api powered by xApi'
    },
  },
  // Path to the API docs
  apis: ['../src/routes/v1/**/*.ts'],
  basePath: '/'
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

export function GetSwaggerDoc() {
    return swaggerSpec;
}