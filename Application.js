const express = require('express');
const app = express();
const port = 5000;


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
        mongoose.connect('mongodb://localhost:27017/RadeGozineBot').then(() => {
            console.log('db connected');
        }).catch(err => {
            console.log(err)
        })
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