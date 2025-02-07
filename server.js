const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT

const app = express()

const indexRoute = require('./routes/flight')
const authRoute = require('./routes/auth');

app.use('/', indexRoute)
app.use('/', authRoute);

mongoose.set('strictQuery', false)
mongoose.connect(process.env.mongoDBURL, 
    {useNewUrlParser: true, useUnifiedTopology: true}  
)

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("MongoDB Connected successfully");
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})