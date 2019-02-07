
class HttpError extends Error {
    constructor(code, message){
        super();
        Error.captureStackTrace(this, HttpError);
        this.name = 'HttpError';
        this.code = code;
        this.message = message;
    }
}
module.exports = HttpError;