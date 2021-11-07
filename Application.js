const mongoose = require('mongoose')
const { startBot } = require('./bot/index')

class Application {
    constructor() {
        this.configApp()
        this.setupMongo()
        startBot()
    }
    setupMongo() {
        mongoose.connect('mongodb://localhost:27017/RadeGozineBot')
    }
    configApp() {
        require("dotenv").config();
    }
}

module.exports = Application