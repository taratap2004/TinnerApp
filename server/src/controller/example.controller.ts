import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/home", () => "Wowww", {
        detail: {
            tags: ['example'],
            summary: 'Get Hello world',
            description: 'Hi'
        }
    })
    .post("/about", ({ body }) => {
        return {
            id: 'cc',
            msg: 'Hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tags: ['example'],
            summary: 'about',
            description: 'Hi'
        }
    })
