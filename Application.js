const express = require('express');
const app = express();
const port = 5000;


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://onlineadmin:p0S6YEUsJhbrVbAn@cluster0.gramm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const mongoose = require('mongoose')
const { startBot } = require('./bot/index')

class Application {
    constructor() {
        this.configApp()
        this.setupMongo()
        this.expressConfig()
        startBot()
    }
    setupMongo() {
        mongoose.connect('mongodb://localhost:27017/RadeGozineBot')
            // client.connect(err => {
            //     const collection = client.db("test").collection("devices");
            //     // perform actions on the collection object
            //     client.close();
            // });
    }
    configApp() {
        require("dotenv").config();
    }
    expressConfig() {
        app.listen(port, () => {})

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }
}

module.exports = Application