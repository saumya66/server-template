const httpStatus = require("http-status")
const ApiError = require("../config/apiError")

const errorConvertor = async (err, req, res, next) => {
    let error = err;
    if(!(err instanceof ApiError)){
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = err.message || httpStatus[statusCode];
        error = new ApiError(
           statusCode,
           errorMessage
        )
    }
    next(error);
}

const errorHandler = async (err, req, res, next) => {
    const {statusCode, message, stack} = err;
    let response = {
        statusCode, 
        message,
        stack
    };
    if(process.env.NODE_ENV === "production"){
        delete response.stack
    }
    res.status(statusCode).send(response);
}
module.exports = {errorConvertor, errorHandler}

