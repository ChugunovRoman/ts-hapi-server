import * as Hapi from 'hapi';
import * as Jwt from 'jsonwebtoken';
import * as Boom from 'boom';

import { IDataBase } from '../index';
import { IUser } from './user';
import { IJwtConfig } from '../../config'; 


export default class UserController {

    private database: IDataBase;
    private config: IJwtConfig;

    constructor(database: IDataBase, config: IJwtConfig) {
        this.database = database;
        this.config = config;
    }

    private getToken(user: IUser): string {
        const secret: string = this.config.secret,
            expiration: string = this.config.expiration,
            payload: object = { id: user._id };

        return Jwt.sign(payload, secret, { expiresIn: expiration });
    }

    public async loginUser(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        const email: string = req.payload.email;
        const password: string = req.payload.password;

        let user: IUser = await this.database.UserModel.findOne({ email });

        if (!user) {
            return rep(Boom.unauthorized('User does not exists.'));
        }

        if (!user.validatePassword(password)) {
            return rep(Boom.unauthorized('Passwoed is invalid.'));
        }

        rep({
            token: this.getToken(user)
        });
    }

    public async createUser(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        try {
            let field: string = 'email',
                value: string = req.payload.email;

            let userIsExists: IUser = await this.database.UserModel.findOne({ [field]: value });
            
            if (userIsExists) {
                return rep(Boom.badRequest(`That ${field} is already busy.`));
            }

            let user: any = await this.database.UserModel.create(req.payload);
            return rep({ token: this.getToken(user) }).code(201);
        } catch(error) {
            return rep(Boom.badImplementation(error));
        }
    }

    public async updateUser(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        const id = req.auth.credentials.id;

        try {
            let user: IUser = await this.database.UserModel.findByIdAndUpdate(id, { $set: req.payload }, { new: true });
            return rep(user);
        } catch(error) {
            return rep(Boom.badImplementation(error));
        }
    }

    public async deleteUser(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        const id = req.auth.credentials.id;

        try {
            let user: IUser = await this.database.UserModel.findByIdAndRemove(id);
            return rep(user);
        } catch(error) {
            return rep(Boom.badImplementation(error));
        }
    }

    public async getUsers(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        try {
            let users: IUser[] = await this.database.UserModel.find();
            return rep(users);
        } catch(error) {
            return rep(Boom.badImplementation(error));
        }
    }

    public async getUser(req: Hapi.Request, rep: Hapi.ReplyNoContinue): Promise<Hapi.Response> {
        const id = req.params.id;

        try {
            let user: IUser = await this.database.UserModel.findById(id);
            return rep(user);
        } catch(error) {
            return rep(Boom.badImplementation(error));
        }
    }
}
