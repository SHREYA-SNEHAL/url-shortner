const express=require('express');

//for EJS
const path=require("path");

//Define Routes
const AllRouter=require("./routes/urlRoutes");

const app=express();
const PORT=4000;

//Set EJS view engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use the user routes

app.use('/auth',AllRouter);

//start the server
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});