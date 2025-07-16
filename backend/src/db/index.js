import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connection successful, Host: ', connectionInstance.connection.host)
    } catch (err) {
        console.log('Cannot connect to Database, Error: ', err.message)
        process.exit(1)
    }
}

export default connectDB