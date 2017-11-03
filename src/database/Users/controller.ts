import * as Hapi from 'hapi';

export const Index = (req: Hapi.Request, res: Hapi.ReplyNoContinue): void => {
    res('Hello World! from hapi!');
};

export const Hello = (req: Hapi.Request, res: Hapi.ReplyNoContinue): void => {
    res(`Hello ${req.params.name}!`);
};