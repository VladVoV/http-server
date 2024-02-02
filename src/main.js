import http from 'http'
import router from "./https-server/router.js";
import args from "./https-server/args.js"
import context from "./https-server/context.js";

import './https-server/observe.js'

const server = http.createServer(args(context(router(
    (req, res) => {
        res.end()
    }
))))

server.listen(8000, () => {
    console.log('Server is running on port 8000')
})
