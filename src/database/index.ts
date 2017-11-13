import * as Mongoose from 'mongoose';

import { IUser, UserModel } from './Users/user';
import { IMongoConfig } from '../config'; 

export interface IDataBase {
    UserModel: Mongoose.Model<IUser>;
}

export const init = (Config: IMongoConfig): IDataBase => {

    (<any>Mongoose).Promise = Promise;
    let promise = Mongoose.connect(Config.connect, {
        useMongoClient: true
    });

    promise
        .then(() => console.log('Successful connect to mopngodb'))
        .catch(err => {
            console.log(`Unable to connect to database: ${err}`);
            process.exit();
        });
    
    return {
        UserModel
    };
};