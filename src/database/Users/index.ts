import * as Hapi from 'hapi';
import Routes from './routes';
import { IDataBase } from '../index';
import { IJwtConfig } from '../../config';

export const init = (server: Hapi.Server, db: IDataBase, config: IJwtConfig) => {
    Routes(server, db, config);
};