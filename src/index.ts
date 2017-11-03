import * as Hapi from 'hapi';
import * as Api from './api';

// to import interactive commands
import './cmd';
import Logger from './plugins/logger';
import * as db from './database';
import * as Users from './database/Users';

global.Promise = require('bluebird');

const server: Hapi.Server = new Hapi.Server();

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

server.connection({ port: 3000, host: '127.0.0.1' });

// init Logger
Logger(server);

// init database
let database = db.init();
// Models
Users.init(server, database);

// start server
server.start((err: Error) => {
    if (err) {
        throw err;
    }

    console.log(`Server is running on ${server.info.uri}`);
});