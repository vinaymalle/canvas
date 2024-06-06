import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authentication from './routes/authentication.js';
import drawing from './routes/drawing.js';
import connect2Db from './controllers/connection.js';
import verify from './controllers/verifyUser.js'
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/auth', authentication);
app.use('/draw', verify, drawing);


connect2Db().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error(err.message);
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


io.on('connection', (socket) => {
    console.log('New user added', socket.id);
    socket.on('new-data', (data) => {
        io.emit('data', data);
    })
    socket.on('change-color', (data) => {
        io.emit('color', data);
    })
})
server.listen(PORT, () => {
    console.log('Server is running....');
})