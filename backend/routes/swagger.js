const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Books API',
        version: '1.0.0',
        description: 'Swagger documentation for use Books API',
    },
    servers: [
        {
            url: `http://localhost:${process.env.NODE_DOCKER_PORT}`
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;