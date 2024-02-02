import {cars} from '../data/cars-data.js';

function getAllCars() {
    return cars;
}

function getRandomCar() {
    const randomIndex = Math.floor(Math.random() * cars.length);
    return cars[randomIndex];
}

function createCar(newCar) {
    const car = { id: cars.length + 1, ...newCar.args };
    cars.push(car);
    return car;
}

function getCarById(req, res) {
    const carId = req.params.id;
    const car = cars.find(car => car.id === parseInt(carId));
    if (car) {
        return car;
    } else {
        res.statusCode = 404;
        return { error: 'Car not found' };
    }
}

function updateCar(req, res) {
    const carId = req.params.id;
    const carIndex = cars.findIndex((car) => car.id === parseInt(carId));
    if (carIndex !== -1) {
        const updatedCar = { ...cars[carIndex], ...req.args };
        cars[carIndex] = updatedCar;
        return updatedCar;
    } else {
        res.statusCode = 404;
        return { error: 'Car not found' };
    }
}

function deleteCar(req, res) {
    const carId = req.params.id;
    const index = cars.findIndex(car => car.id === parseInt(carId));
    if (index !== -1) {
        return cars.splice(index, 1);
    } else {
        res.statusCode = 404;
        return { error: 'Car not found' };
    }
}

export default {
    getAllCars,
    getRandomCar,
    createCar,
    getCarById,
    updateCar,
    deleteCar
};
