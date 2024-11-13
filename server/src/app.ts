console.log('server start running');
import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routers/userRouter';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());

app.use('/api/users', userRouter);

export const io = new Server(server,{ cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('socket: a user connected');
    
    socket.on('disconnect', () => {
        console.log('socket: a user disconnected');
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));