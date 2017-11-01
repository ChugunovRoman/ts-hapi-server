import * as Hapi from 'hapi';
import Routes from './routes';

export const init = (server: Hapi.Server) => {
    Routes(server);
};