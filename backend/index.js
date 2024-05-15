const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventsDAO = require('./dao/eventsDAO');
const usersDAO = require('./dao/usersDAO');
const verifyToken = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

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
    const result = usersDAO.registerUser(req.body);
    const token = jwt.sign({ korisnik }, JWT_SECRET_KEY);
    res.json({ token });
});

app.post('/login', async (req, res) => {
    const result = usersDAO.loginUser(req.body);
    const token = jwt.sign({ /* user data */ }, JWT_SECRET_KEY);
    res.json({ token });
});

app.post('/forgot-password', async (req, res) => {
    const result = usersDAO.forgotPassword(req.body);
    const token = jwt.sign({ /* user data */ }, JWT_SECRET_KEY);
    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
