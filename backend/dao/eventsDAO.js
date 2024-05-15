const db = require('../db');


const searchMaliciousURL = async (req, res) => {
    const { url } = req.params;
    try {
        
        
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
        
    
        const result = await db.query('INSERT INTO event SET ?', eventData);
        const createdEvent = { id: result.insertId, ...eventData };
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
        
      
        await db.query('UPDATE event SET ? WHERE id = ?', [eventData, id]);
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
