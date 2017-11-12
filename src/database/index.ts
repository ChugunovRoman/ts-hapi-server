import * as Mongoose from 'mongoose';

import { IUser, UserModel } from './Users/user';

export interface IDataBase {
    UserModel: Mongoose.Model<IUser>;
}

export const init = (): IDataBase => {

    (<any>Mongoose).Promise = Promise;
    let promise = Mongoose.connect('mongodb://localhost:27017/ts_server_db', {
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