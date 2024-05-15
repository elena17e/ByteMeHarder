
const Event = require('../models/Event');
const db = require('../db');
const xss = require('xss-clean'); 

const searchMaliciousURL = async (req, res) => {
    const { url } = req.params;
    try {
        const safeUrl = xss(url);
       
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM event');
        res.json({ events: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createEvent = async (req, res) => {
    const eventData = req.body;
    try {
        
        const safeEventData = xss(eventData);
        const result = await db.query('INSERT INTO event SET ?', safeEventData);
        const createdEvent = { id: result.insertId, ...safeEventData };
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    try {
        
        const safeEventData = xss(eventData);
        await db.query('UPDATE event SET ? WHERE id = ?', [safeEventData, id]);
        res.json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    searchMaliciousURL
};
