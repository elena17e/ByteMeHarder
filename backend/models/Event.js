
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    creationDate: { type: Date, default: Date.now },
    affectedBrand: String,
    description: String,
    maliciousURL: String,
    maliciousDomainRegistrationDate: Date,
    maliciousDomainDNSRecords: {
        A: String,
        NS: String,
        MX: String
    },
    matchingKeywords: [String],
    status: { type: String, default: 'todo' },
    analystComments: [{
        comment: String,
        timestamp: { type: Date, default: Date.now }
    }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
