require ("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const mongoose=require("mongoose")
const connectDB=require("./config/dbConn")

const PORT=process.env.PORT|| 4000
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/users",require("./routes/user"))
app.use("/api/todos",require("./routes/todo"))
app.use("/api/posts",require("./routes/post"))




mongoose.connection.once("open",()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>{
    console.log(`Server runing on port ${PORT}`)
})
})


mongoose.connection.on("error",error=>{
    console.log(error)
})
