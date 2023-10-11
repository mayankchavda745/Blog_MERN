import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js"
const app = express();

connectToMongo();

app.get('/',(req,res)=>{
    res.send('Hello');    
});

app.use("/api/v1",authRoutes);

app.listen(9000,()=>{
    console.log('Server is running on 9000');
});