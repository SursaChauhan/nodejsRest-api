// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
// import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { ApolloServer } from 'apollo-server-express'; // Import ApolloServer
import { typeDefs } from './graphql/schema.js'; // Import your GraphQL schema
import { resolvers } from './graphql/resolver.js'; // Import your resolvers

import cors  from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/courses',courseRoutes);

app.get('/', (req, res) => {
      res.send('Api is running...');
   });
app.use(notFound);
app.use(errorHandler);

const PORT =  7200;

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs, // Your GraphQL schema
  resolvers, // Your resolvers
});

// Start the Apollo Server
server.start().then(() => {
  // Apply Apollo middleware to Express app
  server.applyMiddleware({ app });
  
  // Start Express server
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`.yellow.bold)
  );
});

// Connect to MongoDB
// connectDB();
