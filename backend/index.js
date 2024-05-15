const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventsDAO = require('./dao/eventsDAO');
const usersDAO = require('./dao/usersDAO');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/events', eventsDAO.getAllEvents);
app.post('/events', eventsDAO.createEvent);
app.put('/events/:id', eventsDAO.updateEvent);
//app.get('/events/:id/comments', eventsDAO.getEventComments);
//app.post('/events/:id/comments', eventsDAO.addEventComment);
//app.put('/events/:id/comments/:commentId', eventsDAO.updateEventComment);

app.post('/register', usersDAO.registerUser);
app.post('/login', usersDAO.loginUser);
app.post('/forgot-password', usersDAO.forgotPassword);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
