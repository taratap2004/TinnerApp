import swagger from "@elysiajs/swagger"

export const swaggerConfig = swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: 'TinnerApp API',
            version: '1.0.1'
        }
    }
})