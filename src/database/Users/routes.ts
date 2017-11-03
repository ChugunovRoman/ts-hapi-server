import * as Hapi from 'hapi';
import { IDataBase } from '../index';
import * as Route from './controller';

export default function(server: Hapi.Server, db: IDataBase): void {

    server.route({
        method: 'GET',
        path: '/',
        handler: Route.Index
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: Route.Hello
    });

}