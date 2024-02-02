class Http404Error extends Error {
    constructor(message) {
        super(message || 'Not Found!');
        this.status = 400;
    }
}
export default Http404Error;
