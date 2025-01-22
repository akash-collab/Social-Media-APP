const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();

//mongoDb connection starts
dotenv.config();
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
})();
//Mongodb connection ends

//Middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

//This code is used to handle incoming HTTP requests and send appropriate responses. Specifically, it’s a simple handler for requests to the homepage (/).
// app.get("/",(req,res)=>{ 
//     res.send("Welcome to Homepage"); 
// })
// app.get("/users",(req,res)=>{
//     res.send("Welcome to users");
// })
// Since we are creating REST Api. So we will not be creating get like this. we will be creating our routes folder. 

//Connecting to Routes
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800, () => {
    console.log("Backend server is running on port 8800");
});