const { logger } = require('./logging');
const mongoose = require('mongoose');

module.exports = function () {
    // Connect to Mongodb 
    mongoose.connect('mongodb://localhost/video_store', { useNewUrlParser: true })
        .then(() => logger.log({
            level: 'info',
            message: 'Connected to MongoDB...!'
        }))
}
