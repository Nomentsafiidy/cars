import { Car } from './Car';
import { User } from './User';

/**
 * Default Response
 */
export interface ApiResponse {
    success: boolean;
    message?: string;
}

/**
 * Response from `LoginUser`
 */
export interface ApiLoginUserResponse extends ApiResponse {
    token?: string;
    user?: User;
}

/**
 * Response from `LoginUser`
 */
export interface ApiCarsResponse extends ApiResponse {
    cars: Car[];
}
