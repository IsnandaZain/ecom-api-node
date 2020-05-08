import HttpStatus from 'http-status-codes';

function BadRequest(message) {
    return {
        "status": HttpStatus.BAD_REQUEST,
        "messages": message
    }
}


function NotFound(message) {
    return {
        "status": HttpStatus.NOT_FOUND,
        "messages": message,
    }
}


function InternalServerError() {
    return { 
        "status": HttpStatus.INTERNAL_SERVER_ERROR,
        "messages": "Error in API, Please contact API Division :)"
    }
}


function Unauthorized(message) {
    return {
        "status": HttpStatus.UNAUTHORIZED,
        "messages": message
    }
}

export {
    BadRequest,
    NotFound,
    InternalServerError,
    Unauthorized
}