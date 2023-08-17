import express  from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
// const express = require('express')

import connect from './database/conn.js';

const app = express()

app.use(morgan('tiny'));
app.use(cors());
//infrom 
app.use(express.json());
/** routes */
config();

// application port 
const port = process.env.PORT || 8080;  // either start at variable PORT or deafult value 8080



app.use('/api',router)  // APIs

app.get('/', (req,res) =>{
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})


// start server only when we have valid connection // first checks valid connection 

connect().then(()=>{
   try {
    app.listen(port,() => {
        console.log(`Server connected to http://localhost:${port}`)
    })
   } catch (error) {
      console.log("Cannot connect to the server");
   }

}).catch(error => {
    console.log("Invalid Databse Connection");
})
