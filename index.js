const express = require('express');
const { exceptionHandler } = require('./startup/logging');
const app = express();

exceptionHandler();

require('./startup/db')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/validation')();

// throw new Error('Manually added errorr');
// const p = Promise.reject(new Error('Manually Promise Reject'));
// p.then(() => console.log('Done'));

// Listen on Port
const port = process.env.PORT || 3000;
app.listen(port, () => logger.log({
    level: 'info',
    message: `Listen on port ${port}`
}));
