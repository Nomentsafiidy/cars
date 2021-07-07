import { ApiCarsResponse } from './../models/ApiResponse';
import * as functions from './../functions';
import * as dasCar from './../dao/car';
import * as daoComment from './../dao/comment';
import { Car } from './../models/Car';

export class CarService {
    /**
     * getCars
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    getCars = async (auth: boolean): Promise<ApiCarsResponse> => {
        const connection = functions.getConnection();
        const response: ApiCarsResponse = { success: false, cars: [] };
        const cars = await dasCar.selectCar(connection, ' 1 ');
        if (cars) {
            if (auth) {
                let carsTmp: Car[] = [];
                for (let i = 0; i < cars.length; i++) {
                    const car = new Car(cars[i]);
                    const comments = await daoComment.selectComment(connection, `car_id = ${car.id}`);
                    if (comments) {
                        car.comments = [];
                    }
                    carsTmp.push(car);
                }
                response.cars = carsTmp;
            } else {
                response.cars = cars;
            }
        }
        return response;
    };
}

export const carService = new CarService();
