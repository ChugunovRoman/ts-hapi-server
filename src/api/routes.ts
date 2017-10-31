import * as Hapi from "hapi";

import { Index, Hello } from './handlers';

export default function Routes(server: Hapi.Server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: Index
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        handler: Hello
    });
};