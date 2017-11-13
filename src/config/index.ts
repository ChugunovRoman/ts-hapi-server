import * as Path from 'path';

const Config = require('yaml-config').readConfig(Path.join(__dirname, './config.yaml'));

export interface IServerConfig {
    port: number;
    host: string;
    routePrefix: string;
}

export interface IMongoConfig {
    connect: string;
}

export interface IJwtConfig {
    secret: string;
    expiration: string;
}

export function getServerConfig(): IServerConfig {
    return Config.server;
}

export function getMongoConfig(): IMongoConfig {
    return Config.mongo;
}

export function getJwtConfig(): IJwtConfig {
    return Config.jwt;
}