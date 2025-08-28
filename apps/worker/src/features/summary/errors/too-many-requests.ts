export default class TooManyRequestsError extends Error {
    constructor() {
        super("Too many requests");
    }
}
