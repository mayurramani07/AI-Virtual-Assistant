const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');

dotenv.config();

const port = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.send("Jai Shree Shyam");
})

app.listen(port, ()=> {
    connectDb()
    console.log(`Server is running on port ${port}`);
} )