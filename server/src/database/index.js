const mongoose = require('mongoose')
const config = require('../config')

const connectDatabase = async () => {
    try{
        await mongoose.connect(config.DATABASE_URL)
        console.log(`Database is run`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    connectDatabase
}