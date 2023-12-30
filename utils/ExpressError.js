class ExpressError extends Error {
    constructor(statusCode,mesage) {
        super();
        this.status = statusCode;
        this.message = mesage;
    }
}


module.exports = ExpressError;