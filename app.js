const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/Auth');
const chat = require('./routes/chat');
const user = require('./routes/user');
const tokens = require('./routes/tokens');
const firebase = require('./routes/firebase');
const firebaseService = require('./services/firebase');
const app = express();
const http = require('http');
const admin = require('./firebase'); // Assuming the `firebase.js` file is in the same directory
const { Server } = require('socket.io');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());

require('custom-env').env(process.env.NODE_ENV, './config');
app.use('/api/Chats', auth, chat);
app.use('/api/Users', user);
app.use('/api/Tokens', tokens);
app.use('/api/Firebase', firebase);
app.use(express.static('public'));

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});


io.on('connection', (socket) => {
    socket.on('myuser', user => {
        socket.join(user)
    });

    socket.on('sendMessage', async (data) => {
        const { username, responseData } = data;
        // Send push notification to the user
        const token = await firebaseService.getToken(username)
        console.log('token: ', token);
        const message = {
            notification: {
                title: 'New Message',
                body: responseData.content, // The message content
            },
            token
        };

        try {
            await admin.messaging().send(message);
            console.log('Push notification sent successfully');
        } catch (error) {
            console.error('Error sending push notification:', error);
        }

        io.to(username).emit('receiveMessage', { responseData, currentChatId: data.currentChatId });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});


app.post('/api/sendNotification', async (req, res) => {
    const { username, message } = req.body;
    console.log('message: ', message);
    console.log('username: ', username);
    const token = await firebaseService.getToken(username)
    console.log('token: ', token);

    const notification = {
        title: 'New Message',
        body: message,
    };

    const messagePayload = {
        token,
        notification,
    };

    try {
        const response = await admin.messaging().send(messagePayload);
        console.log('Push notification sent successfully:', response);
        res.status(200).json({ message: 'Push notification sent successfully' });
    } catch (error) {
        console.error('Error sending push notification:', error);
        res.status(500).json({ error: 'Error sending push notification' });
    }
});