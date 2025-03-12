import mongoose from 'mongoose'

let cachedDb = null

export async function connectDb() {
  try {
    if (cachedDb) {
      return cachedDb
    }
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Mongo connected')

    cachedDb = db
    return db
  } catch (error) {
    console.log('error connecting', error)
  }
}
