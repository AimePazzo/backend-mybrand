import swaggerjsdoc from 'swagger-jsdoc'
import swagger from 'swagger-ui-express'

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
                url: 'https://backend-mybrand-xea6.onrender.com',
            },
        ],
    },
    apis: ['./src/routers/*.ts'],
}

const spacs = swaggerjsdoc(options)
const swaggerSetup = (app: any) => {
    app.use('/api-docs',
        swagger.serve,
        swagger.setup(spacs)
    )
}

export default swaggerSetup;