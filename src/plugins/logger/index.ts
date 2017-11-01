import * as Hapi from 'hapi';

const options = {
    reporters: {
        console: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [
                    {
                        response: '*',
                        log: '*'
                    }
                ]
            },
            {
                module: 'good-console'
            },
            'stdout'
        ]
    }
};

const Logger = (server: Hapi.Server) => {
    server.register({
        register: require('good'),
        options
    }, err => {
        if (err) {
            throw err;
        }
    });
};

export default Logger;