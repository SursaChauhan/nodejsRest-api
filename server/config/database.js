// database.js

import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb+srv://surendra:singh123@cluster0.ztxomvh.mongodb.net/IdeaClan', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(error => console.error('MongoDB connection error:', error));
