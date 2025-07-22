const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db.js');
const authRouter  = require('./routes/authRoutes.js');
const cookiesParser = require('cookie-parser');
const cors = require('cors')


app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cookiesParser());
app.use("/api/auth",authRouter)


app.get("/", (req,res) => {
    res.send("Jai Shree Shyam");
})

app.listen(port, ()=> {
    connectDb()
    console.log(`Server is running on port ${port}`);
} )