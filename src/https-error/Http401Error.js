class Http401Error extends Error {
    constructor(message) {
        super(message || 'Unauthorized!');
        this.status = 400;
    }
}
export default Http401Error;
