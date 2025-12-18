import mongoose from "mongoose"
import "dotenv/config"

export const connectDB = async()=>{
    try {

        if (!process.env.DB_URL) {
           throw new Error('DB_URL environment variable is not defined')
            }
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`✅️ Connected to MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB ${error}`)
        process.exit(1)
    }
}