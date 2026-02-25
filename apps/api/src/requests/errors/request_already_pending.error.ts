export class RequestAlreadyPendingError extends Error {
  constructor() {
    super('There is already a request for this movie pending!');
  }
}
