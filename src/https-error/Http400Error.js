class Http400Error extends Error {
    constructor(message) {
        super(message || 'Bad request!');
        this.status = 400;
    }
}
export default Http400Error;
