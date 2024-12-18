import Elysia from "elysia"
import { AuthMiddleware, AuthPayload } from "../middlewares/auth.middleware"
import { UserDto } from "../types/user.type"
import { LikeService } from "../services/like.sevice"

export const LikeController = new Elysia({
    prefix: '/api/Like',
    tags: ['Like']
})

    .use(AuthMiddleware)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await LikeService.togglelike(user_id, target_id)
            set.status = 204 // No Content
        } catch (error) {
            set.status = 400 // Bad Request
            throw error
        }
    }, {
        detail: { summary: "Toggle Like" },
        isSignIn: true,
        body: "target_id"
    })