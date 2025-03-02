import mongoose from 'mongoose'

const connectdb = async () => {

    console.log('Connecting to DB')
    await mongoose.connect("mongodb://admin:password@mongodb:27017/myfullauth")
        .then(() => { console.log('DB Connected') })
        .catch((err) => { console.error('Error : ', err) })

}

export { connectdb }