export class MaxNummberOfCheckInsError extends Error {
    constructor () {
      super('Daily limit of check-ins was exceeded.')
    }
  }
  