import Elysia, { error, t } from "elysia"
import { ImageHelper } from "../helpers/image.helper"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddleware, AuthPayload } from "../middlewares/auth.middleware"
import { PhotoService } from "../services/photo.sevice"


export const PhotoController = new Elysia({
    prefix: '/api/photo',
    tags: ['Photo']
})

    .use(PhotoDto)
    .use(AuthMiddleware)
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = 400 // Bad Request
            if (error instanceof Error)
                throw error
            throw new Error('Something went wrong, try again later')
        }
    }, {
        detail: { summary: 'Upload photo', },
        body: 'upload',
        response: 'photo',
        isSignIn: true
    })