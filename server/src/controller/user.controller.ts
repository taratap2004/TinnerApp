import Elysia from "elysia"
import { AuthMiddleware, AuthPayload } from "../middlewares/auth.middleware"
import { Query } from "mongoose"
import { UserDto } from "../types/user.type"
import { UserService } from "../services/user.sevice"

export const UserController = new Elysia({
    prefix: "/api/user",
    tags: ['User']
})
    .use(AuthMiddleware)
    .use(UserDto)

    .get('/all', () => {
        return {
            text: "Hello world"
        }
    }, {
        isSignIn: true
    })

    .get('/', async ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await UserService.get(query, user_id)
    }, {

        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true

    })

    .patch('/', async ({ body, set,Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = 204
        } catch (error) {
            set.status = 400 // Bad Request
            if (error instanceof Error)
                throw new Error(error.message)
            set.status = 500 // Internal Server Error
            throw new Error('Something went wrong, try again later')
        }
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        //response: "user",
        isSignIn: true
    })