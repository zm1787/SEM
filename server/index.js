import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';

import contactRoutes from './routes/contact.js';
import userRoutes from './routes/user.js';
import businessRoutes from './routes/business.js';
import chatRoutes from './routes/chat.js';

import { startSocketServer } from './socket/connection.js';


const app = express();
dotenv.config();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use('/contact', contactRoutes);
app.use('/user', userRoutes); // Every route inside of userRoutes will start with '/users'
app.use('/chat', chatRoutes); // Every route inside of userRoutes will start with '/users'
app.use('/business', businessRoutes); // Every route inside of businessRoutes will start with '/business'

const server = createServer(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => server.listen(process.env.PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); // Makes sure we dont get any error messages in the console


// Chat io connections
startSocketServer(server);