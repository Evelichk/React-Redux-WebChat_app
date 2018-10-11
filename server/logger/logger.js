'use strict';
const winston = require('winston');
const path = require('path');

const filename = path.join(__dirname, '/logs/errors.log' );

const logger = module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'error',
            filename: filename
        })
    ]
})