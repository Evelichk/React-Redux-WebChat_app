'use strict';

class AuthError extends Error{
    constructor(message, code){
        super();
        Error.captureStackTrace(this, AuthError);
        this.name = 'AuthError';
        this.message = message;
        if (code) this.code = code;
    }

}

module.exports = AuthError;





