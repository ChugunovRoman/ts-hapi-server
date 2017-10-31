import * as Hapi from "hapi";

export function Index(req: Hapi.Request, res: Hapi.ReplyNoContinue) {
    res('Hello World! from hapi!');
}

export function Hello(req: Hapi.Request, res: Hapi.ReplyNoContinue) {
    res(`Hello ${req.params.name}!`);
}