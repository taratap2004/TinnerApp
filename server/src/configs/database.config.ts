import mongoose from "mongoose"

const username = Bun.env.MONGODBUSERNAME || 'your_username'
const password = Bun.env.MONGODBPASSWORD || 'your_password'
const db_name = Bun.env.MONGODB_DBNAME || 'TinnerApp'

const uri = `mongodb+srv://${username}:${password}  @taratap.a2wlw.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {

            await mongoose.connect(uri)
            console.log('------- MongoDB Connected -------')

        } catch (error) {

            console.error('---- MongoDB Connection Error ----')
            console.error(error)
        }
    }
}