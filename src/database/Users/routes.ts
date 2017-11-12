import * as Hapi from 'hapi';
import { IDataBase } from '../index';
import UserController from './controller';
import * as validator from './validator';

export default function(server: Hapi.Server, database: IDataBase): void {

    const controller: UserController = new UserController(database);
    server.bind(controller); 

    // Get all users
    server.route({
        method: 'GET',
        path: '/users',
        config: {
            handler: controller.getUsers,
            tags: ['api', 'users'],
            description: 'Get all users.'
        }
    });

    // Get user by id
    server.route({
        method: 'GET',
        path: '/users/{id}',
        config: {
            handler: controller.getUser,
            tags: ['api', 'users'],
            description: 'Get one user.'
        }
    });

    // create user
    server.route({
        method: 'PUT',
        path: '/users',
        config: {
            handler: controller.createUser,
            tags: ['api', 'usets'],
            description: 'Creating a new user in database.',
            validate: {
                payload: validator.createUserModel,
                // headers: validator.jwtValidator // this router require authorization
            }
            // this route can return 200 and 400 (if the user exists)
        }
    });

    // delete user
    server.route({
        method: 'DELETE',
        path: '/users',
        config: {
            handler: controller.deleteUser,
            tags: ['api', 'usets'],
            description: 'Deleting a user from database.',
            validate: {
                headers: validator.jwtValidator // this router require authorization
            }
        }
    });

    // authorization user
    server.route({
        method: 'POST',
        path: '/users/login',
        config: {
            handler: controller.loginUser,
            tags: ['api', 'usets'],
            description: 'Login a user.',
            validate: {
                payload: validator.loginUserModel
            }
        }
    });

}