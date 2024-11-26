import Elysia from "elysia"
import { AuthMiddleware } from "../middlewares/auth.middleware"

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(AuthMiddleware)

    .get('/all', () => {
        return {
            text: "Hello world"
        }
    }, {
        isSignIn: true
    })