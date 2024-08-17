export class InvalidAmount extends Error {
    constructor(amount: number) {
        super(`Invalid amount: ${amount}`);
    }
}
