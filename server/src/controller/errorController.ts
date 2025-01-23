import Elysia, { error, t } from "elysia"

export const ErrorController = new Elysia({
    prefix: '/api/error',
    tags: ['Account']
})
    .get('/:code', ({ params }) => {
        return error(params.code)
    }, {
        params: t.Object({
            code: t.Number()
        })
    })
