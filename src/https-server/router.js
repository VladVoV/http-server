import routes from "../routes.js";
import { pub } from "../pubsub.js";
import { URL } from 'url';

export default fn => async (req, res) => {
    const url = new URL(req.url, 'http://localhost');

    const foundRoute = findRoute(req.method, url.pathname);

    if (foundRoute) {
        try {
            const { handler, params } = foundRoute;
            req.params = params;
            const data = await handler(req, res);
            pub(url.pathname, req.args, req.context, { data });
        } catch (err) {
            console.log(err);
            res.statusCode = err.status || 500;
            res.write(JSON.stringify({ error: err.message || 'Something went wrong!' }));
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ error: 'Not found!' }));
    }
    return fn(req, res);
}

function findRoute(method, pathname) {
    const methodRoutes = routes[method];
    if (!methodRoutes) return null;

    for (const [route, handler] of Object.entries(methodRoutes)) {
        const routeSegments = route.split('/');
        const pathSegments = pathname.split('/');

        if (routeSegments.length !== pathSegments.length) continue;

        const params = {};

        let matched = true;

        for (let i = 0; i < routeSegments.length; i++) {
            const routeSegment = routeSegments[i];
            const pathSegment = pathSegments[i];

            if (routeSegment.startsWith(':')) {
                const paramName = routeSegment.slice(1);
                params[paramName] = pathSegment;
            } else if (routeSegment !== pathSegment) {
                matched = false;
                break;
            }
        }

        if (matched) {
            return { handler, params };
        }
    }

    return null;
}
