import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MyBrand',
            version: '1.0.0',
            description: 'MyBrand API',
            contact: {
                name: 'Aime Patrick',
                email: 'ndagijimanapazo64@gmail.com',
            }
        },
        servers: [
            {
                url: 'https://backend-mybrand-xea6.onrender.com/api/v1/'
            },
            {
                url: 'http://localhost:5000/api/v1/'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    scheme: 'bearer',
                    in: 'header',
                    value: 'Bearer YOUR_TOKEN_HERE',
                    description: 'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
                },
            },
        },
    },
    apis: ['./src/routers/*.ts'],
}

const specs = swaggerJsdoc(options)
const swaggerSetup = (app: any) => {
    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
}

export default swaggerSetup;
