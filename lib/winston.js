const { createLogger, format, transports } = require('winston');

// Create a logger for error logs
const errorLogger = createLogger({
    format: format.combine(
      format.timestamp(),
      format.printf(info => {
        let logMessage = `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`;
        if(info && info.response && info.response.config && info.response.config.url){
          logMessage += ` - Request URL : ${info.response.config.url}`;
        }
        if (info.clientId) {
          logMessage += ` (Client ID: ${info.clientId})`;
        }
        if (info.response && info.response.data) {
          logMessage += ` - Response Data: ${JSON.stringify(info.response.data)}`;
        }
        if (info.error) {
          logMessage += ` - ${info.error.stack || info.error.message}`;
        }
        
        return logMessage;
      })
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' })
    ]
  });


module.exports = {
    errorLogger
}