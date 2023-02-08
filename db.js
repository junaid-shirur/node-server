const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.mongoose_URI)

        console.log(`MongoDb connected: ${connection.connection.host}`);
    } catch (error) {
        console.error('error',error)
        process.exit(1)
    }
}

module.exports = connectDB