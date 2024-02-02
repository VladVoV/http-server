export const svg = fn => async (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml')

    const data = await fn(req, res)
    res.write(data)

    return data
}

export const textHTML = fn => async (req, res)   => {
    res.setHeader('Content-Type', 'text/html')

    const data = await fn(req, res)
    res.write(data)

    return data
}

export const json = fn => async (req, res) => {
    try {
        let data;
        if (fn.constructor.name === 'AsyncFunction') {
            data = await fn(req, res);
        } else {
            data = fn(req, res);
        }

        const replacer = (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (visited.has(value)) {
                    return '[Circular]';
                }
                visited.add(value);
            }
            return value;
        };

        const visited = new Set();

        const jsonData = JSON.stringify(data, replacer, ' ');

        res.setHeader('Content-type', 'application/json');
        res.write(jsonData);

        return jsonData;
    } catch (err) {
        console.error('Error in JSON response:', err);
        res.statusCode = 500;
        res.write(JSON.stringify({ error: 'Internal Server Error' }));
        return { error: 'Internal Server Error' };
    }
};
