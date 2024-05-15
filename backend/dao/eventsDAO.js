
const mongoose = require('mongoose');
const Event = require('../models/Event');

/*mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});*/

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createEvent = async (req, res) => {
    const eventData = req.body;
    try {
        const newEvent = await Event.create(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent
};
