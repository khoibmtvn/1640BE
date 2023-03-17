const { createLogger, transports } = require('winston');
const { BaseError } = require('../utils/error-app');


const LogErrors = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app_error.log' })
    ]
});


class ErrorLogger {
    constructor() {}
    async logError(err) {
        console.log("Error Stack", "<------------------- Error")
        console.log(err)
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        });
        console.log('==================== End Error Logger ===============');
        // log error with Logger plugins

        return false;
    }

    isTrustError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        } else {
            return false;
        }
    }
}

const ErrorHandler = async(err, req, res, next) => {

    const errorLogger = new ErrorLogger();

    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    })

    process.on('uncaughtException', (error) => {
        errorLogger.logError(error);
        if (errorLogger.isTrustError(err)) {
            //process exist // need restart
        }
    })

    // console.log(err.description, '-------> DESCRIPTION')
    // console.log(err.message, '-------> MESSAGE')
    // console.log(err.name, '-------> NAME')
    if (err) {
        await errorLogger.logError(err);
        if (errorLogger.isTrustError(err)) {
            if (err.errorStack) {
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({
                    'status': err.statusCode,
                    'message': errorDescription
                })
            }
            return res.status(err.statusCode).json({ 'message': err.message })
        }
        return res.status(500).json({
            'status': 500,
            'message': "Interval Server"
        })
    }
    next();
}

module.exports = ErrorHandler;