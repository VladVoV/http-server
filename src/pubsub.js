import EventEmitter from 'node:events'

const pubsub = new EventEmitter()

pubsub.setMaxListeners(1e3)

export const pub = (eventName, ...rest) => {
    pubsub.emit(eventName, ...rest)
}

const safeCall = (eventName, fn) => async (...args) => {
    try{
        await fn(...args)
    } catch (err) {
        console.error('\x1b[31m', 'Rule Error', eventName, '\x1b[0m', err)
    }
}

export const sub = (eventName, callback) => {
    pubsub.addListener(eventName, safeCall(eventName, callback))
}
