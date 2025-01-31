const mongoose = require('mongoose')

const connectdb = async ()=>{

    console.log('Connecting to DB')
    
    await   mongoose.connect(process.env.MONGO_DB_URL)
    
    console.log('DB Connected')
}

module.exports = connectdb