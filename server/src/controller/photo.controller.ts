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
    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = 204 // No Content
        } catch (error) {
            set.status = 400 // Bad Request
            if (error instanceof Error)
                throw error
            throw new Error('Something went wrong, try again later')
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "photo_id"
    })


    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhotos(user_id)
    }, {
        detail: { summary: "Get photo[] by user_id" },
        isSignIn: true,
        response: "photos"
    })

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