const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const eventsDAO = require('./dao/eventsDAO');
const usersDAO = require('./dao/usersDAO');
const verifyToken = require('./auth');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.get('/events', eventsDAO.getAllEvents);
app.post('/events', verifyToken, eventsDAO.createEvent);
app.put('/events/:id', verifyToken, eventsDAO.updateEvent);
app.get('/events/:url', verifyToken, eventsDAO.searchMaliciousURL);


//app.get('/events/:id/comments', eventsDAO.getEventComments);
//app.post('/events/:id/comments', eventsDAO.addEventComment);
//app.put('/events/:id/comments/:commentId', eventsDAO.updateEventComment);

app.post('/register', async (req, res) => {
    const result = await usersDAO.registerUser(req.body, res);
    if(result === 401) {
        return res.status(401).json({ message: "User already exists" });
    }
    const token = jwt.sign({ name: result.name, surname: result.surname, email: result.email }, process.env.JWT_SECRET_KEY);
    res.json({ token });
});

app.post('/login', async (req, res) => {
    const result = await usersDAO.loginUser(req.body, res);
    if(result === 401) {
        res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ name: result.name, surname: result.surname, email: result.email }, process.env.JWT_SECRET_KEY);
    res.json({ token });
});

app.post('/forgot-password', async (req, res) => {
    const result = await usersDAO.forgotPassword(req.body, res);
    //const token = jwt.sign({ /* user data */ }, JWT_SECRET_KEY);
    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
