const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const authRouter  = require('./routes/authRoutes.js');

dotenv.config();

const port = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter)


app.get("/", (req,res) => {
    res.send("Jai Shree Shyam");
})

app.listen(port, ()=> {
    connectDb()
    console.log(`Server is running on port ${port}`);
} )