import * as Hapi from 'hapi';
import Routes from './routes';
import { IDataBase } from '../index';

export const init = (server: Hapi.Server, db: IDataBase) => {
    Routes(server, db);
};