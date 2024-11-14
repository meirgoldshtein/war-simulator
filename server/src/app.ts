console.log('server start running');

import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/db';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routers/userRouter';
import attackRouter from './routers/attackRouter';
import { verifyToken } from './socket';
import { TokenPayload } from './types/tokenPayload';
import organizationRouter from './routers/organizationRouter';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/attack', attackRouter);
app.use('/api/organizations', organizationRouter);
export const io = new Server(server,{ cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('authenticate', (token: string) => {
        const decoded = verifyToken(token);
        
        if (!decoded) {
            socket.emit('auth_error', 'Invalid token');
            return;
        }
        const { location } = decoded as TokenPayload;
        socket.join(location);
        console.log(`Client joined room: ${location}`);
        socket.emit('joined_room', location as string);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// io.on('newLaunch', (data) => {
//     // קבל את המיקום (location) מהנתונים שנשלחו על-ידי הלקוח
//     const { location } = data;
    
//     // שלח את המידע לכל הלקוחות שנמצאים באותו חדר
//     io.to(location).emit('newLaunch', data);
// });



server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));