import * as Hapi from 'hapi';

import './cmd';

const server = new Hapi.Server();

server.connection({ port: 3000, host: '127.0.0.1' });

server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Server is running on ${server.info.uri}`);
});