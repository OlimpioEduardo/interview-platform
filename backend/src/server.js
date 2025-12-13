import express from "express"
import path from "path"
import "dotenv/config"
import { connectDB } from "./lib/db.js"

const app = express()

const __dirname = path.resolve()

const PORT = process.env.PORT

app.get("/health", (req, res)=>{
    res.status(200).json({msg:"api is up and running"})
})

app.get("/books", (req, res)=>{
    res.status(200).json({msg:"this is the books endpoint"})
})


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(PORT, ()=> console.log("Server Running on port:", PORT))
    } catch (error) {
        console.error("💥 Error starting the server", error)
    }
}

startServer()