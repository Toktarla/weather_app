const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    city: {
        type: String,
        required: true
    },
    requestType: {
        type: String,
        required: true,
        enum: ['current', 'forecast14days', 'city-info']
    },
    responseData: mongoose.Schema.Types.Mixed,
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const History = mongoose.model('History', historySchema);

module.exports = { History };