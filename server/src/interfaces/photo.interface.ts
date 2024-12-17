import mongoose, { mongo } from "mongoose"
import { photo } from "../types/photo.type"

type photoWithOutID = Omit<photo, 'id'>
export interface IPhotoDocument extends mongo.Document, photoWithOutID {
    user: mongoose.Types.ObjectId
    created_at?: Date
    toPhoto: () => photo
}

export interface IPhotoModel extends mongoose.Model<IPhotoDocument> {
    setAvatar: (photo_id: string, user_id: string) => Promise<boolean>
}
