class Http403Error extends Error {
    constructor(message) {
        super(message || 'Forbidden!');
        this.status = 400;
    }
}
export default Http403Error;
