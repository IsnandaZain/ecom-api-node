import HttpStatus from 'http-status-codes';

function BadRequest(res, message) {
    return res.status(HttpStatus.BAD_REQUEST).json({
        "status": HttpStatus.BAD_REQUEST,
        "messages": message
    })
}


function NotFound(res, message) {
    return res.status(HttpStatus.NOT_FOUND).json({
        "status": HttpStatus.NOT_FOUND,
        "messages": message,
    }) 
}


function InternalServerError(res) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        "status": HttpStatus.INTERNAL_SERVER_ERROR,
        "messages": "Error in API, Please contact API Division :)"
    })
}


function Unauthorized(res, message) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
        "status": HttpStatus.UNAUTHORIZED,
        "messages": message
    })
}

export {
    BadRequest,
    NotFound,
    InternalServerError,
    Unauthorized
}