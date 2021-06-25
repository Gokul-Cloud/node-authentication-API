import dotenv from 'dotenv';
import Express  from "express";
const app = Express();

import mongoose from 'mongoose';
//import router
import authroute from './routes/auth.js';
import postRoute from './routes/posts.js';
//dotenv config
dotenv.config();


//connect to db
mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser:true,useFindAndModify:true,useUnifiedTopology:true},
()=>console.log("connect to db"));

//middleware
app.use(Express.json());


//route middleware
app.use('/api/user',authroute);
app.use('/api/posts',postRoute)




app.listen(process.env.PORT,()=>console.log(`server up and running in port:${process.env.PORT}`));