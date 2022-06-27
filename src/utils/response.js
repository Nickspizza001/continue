/**
 * @param type either 'success' or 'error'
 * @param code the status code of the response
 * @param message the message to be sent
 * @param data contains the fetched resource if any
 */

class Response {

    /**
     * @param code the status code of the response
     * @param message the message to be sent
     */
    static error(code, message) {
        return {
            status: 'error',
            code: code,
            message: message
        }
    }

    /**
     * @param code the status code of the response
     * @param message the message to be sent
     */
    static success(code, message) {
        return {
            status: 'success',
            code: code,
            message: message
        }
    }

    /**
     * @param code the status code of the response
     * @param message the message to be sent
     * @param data contains the fetched resource if any
     */
    static success(code, message, data) {
        return {
            status: 'success',
            code: code,
            message: message,
            data: data
        }
    }
}

module.exports = Response;