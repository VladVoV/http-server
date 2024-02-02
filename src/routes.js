import {json, svg, textHTML} from './https-server/wrapper.js'

import randomFigure from "./svg/randomFigure.js";
import testHTML from "./test/testHTML.js";
import libraryOverview from "./library/libraryOverview.js";
import carFunctions from './cars-handler-functions/cars-handler.js'
import mainTemplate from "./client-side/mainTemplate.js";

const resolver = fn => (req, res) => fn(req.args, req.context)

const GET = {
    '/':  textHTML(mainTemplate),

    '/test': textHTML(testHTML),

    '/api/libraryOverview': json(resolver(libraryOverview)),

    '/api/echo': json((req, res) => {
        return ({args: req.args, context: req.context})
    }),

    '/randomFigure': svg(randomFigure),

    '/cars': json(carFunctions.getAllCars),

    '/cars/random': json(carFunctions.getRandomCar),

    '/cars/:id': json(carFunctions.getCarById)
}

const POST = {
    '/api/salute': json((req, res) => {
        return req.args
    }),

    '/cars': json(carFunctions.createCar)
}

const PUT = {
    '/cars/:id': json(carFunctions.updateCar)
}
const DELETE = {
    '/cars/:id': json(carFunctions.deleteCar)
}

export default {GET, POST, PUT, DELETE};
