export class LateCheckInValidationError extends Error {
	constructor() {
		super('Time limit for check-in validation was exceeded.')
	}
}
