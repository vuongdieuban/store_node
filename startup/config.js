const config = require("config");
const { logger } = require("../startup/logging");

module.exports = function() {
  /**set jwtPrivateKey in terminal
   * in PowerShell: $env:video_store_jwtPrivateKey="optionalPrivateKeyString"
   * in GitBash: export video_store_jwtPrivateKey="optionalPrivateKeyString" */

  try {
    if (!config.get("jwtPrivateKey")) {
      throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    }
  } catch (err) {
    logger.error({ message: err.stack });
  }
};
