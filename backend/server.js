const express = require('express');
const ConnectDb = require("./config/dbConnection");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

ConnectDb();

const app = express();

const PORT = process.env.PORT || "8070";

app.use(cors(
    {
        origin: [""],
        methods: ["POST", "GET"],
        credentials: true
    }
    ));
app.use(bodyParser.json());

app.use("/api/create", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

module.exports = app;
