const config = require('config');

module.exports = function () {
    /**set jwtPrivateKey in terminal
     * in PowerShell: $env:video_store_jwtPrivateKey="optionalPrivateKeyString" 
     * in GitBash: export video_store_jwtPrivateKey="optionalPrivateKeyString" */
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}

