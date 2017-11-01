import * as Hapi from 'hapi';

import { Index, Hello } from './handlers';
import { Route } from 'hapi';

const Routes = (server: Hapi.Server) => {

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

export default Routes;