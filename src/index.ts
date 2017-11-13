import * as Hapi from 'hapi';

// to import interactive commands
import './cmd';
import Logger from './plugins/logger';
import * as db from './database';
import * as Users from './database/Users';
import * as Config from './config'; 

global.Promise = require('bluebird');

const server: Hapi.Server = new Hapi.Server();
const cfg: Config.IServerConfig = Config.getServerConfig();

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

server.connection({ port: cfg.port, host: cfg.host });

server.realm.modifiers.route.prefix = cfg.routePrefix;

// init Logger
Logger(server);

// init database
let database = db.init(Config.getMongoConfig());
// Models
Users.init(server, database, Config.getJwtConfig());

// start server
server.start((err: Error) => {
    if (err) {
        throw err;
    }

    console.log(`Server is running on ${server.info.uri}`);
});