const express =require('express')
const app=express();
const connectDB=require('./Config/Database.js')
const cors=require('cors')
connectDB()
app.use(cors())
app.use(express.json())
const PORT=8000||process.env.PORT
app.listen(PORT,()=>{
    try {
        console.log("server is running successfully on port no",PORT)

        
    } catch (error) {
        console.log("there is an error",error)
        
    }
})
app.use('/api/auth',require('./Routes/User.js'))
