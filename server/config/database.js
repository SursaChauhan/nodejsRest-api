import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://surendra:singh123@cluster0.ztxomvh.mongodb.net/Full-Stack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectDB = mongoose.connection;

// Event listeners to track the connection status
connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
connectDB.once('open', () => {
    console.log('MongoDB connected successfully!');
});


export default connectDB;
