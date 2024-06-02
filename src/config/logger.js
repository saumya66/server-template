const winston = require("winston")

const enumerateErrorFormat = winston.format((info) => { //checks if info is of Error instance, then adds the error stack trace too in log
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

let transports = [new winston.transports.Console()];
if(process.env.NODE_ENV === 'production'){
  transports = transports.concat([  
    new winston.transports.File({ 
      filename: './logs/winston/error.log', 
      level: 'error', 
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
    new winston.transports.File({ 
      filename: './logs/winston/combined.log',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ])
};

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: transports,
});
  
module.exports = logger;