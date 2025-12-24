import express from "express"
import path from "path"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

import { serve } from "inngest/express"

import "dotenv/config"
import { connectDB } from "./lib/db.js"
import { inngest , functions } from "./lib/inngest.js"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express()

const __dirname = path.resolve()

app.use(express.json())

// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors(
    {
        origin:process.env.CLIENT_URL,
        credentials:true
    }
))

app.use(clerkMiddleware())// this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({client:inngest, functions}))
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)

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