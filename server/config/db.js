const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected!!"));
        await mongoose.connect(`${process.env.MONGO_URI}/auth-system`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;