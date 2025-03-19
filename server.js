import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
import connectDB from "./config/db.js"
import userRouter from "./routes/user.route.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/",userRouter)

app.get("/",(req,res)=>{
    res.send("Root is working")
})

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on the port ${PORT}`)
})