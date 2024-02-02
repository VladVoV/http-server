const parseBody = req => new Promise(resolve => {
    const chunks = []
    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', () => {
        resolve(Buffer.concat(chunks).toString())
    })
})


export default fn => async (req, res) => {
    const parsedUrl = new URL(req.url, 'http://localhost')
    const searchParams = Object.fromEntries(parsedUrl.searchParams.entries())

    let jsonBody
    if (req.headers['content-type'] === 'application/json') {
        const parsedBody = await parseBody(req)
        try {
            const json = JSON.parse(parsedBody)
            if(typeof json === 'object'){
                jsonBody = json
            }
        } catch (err) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json')
            req.end(JSON.stringify({error: 'This is not json'}))
            return
        }
    }

    req.args = {
        ...searchParams,
        ...jsonBody
    }


    return fn(req, res)
}
