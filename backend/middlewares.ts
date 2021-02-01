import {isHttpError, Status} from "./deps.ts";

export const logger = async (ctx: any, next: any) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};

export const errorHandler = (async (ctx: any, next: any) => {
    try {
        await next();
    } catch (err) {
        if (isHttpError(err)) {
            switch (err.status) {
                case Status.NotFound:
                    ctx.response.body = "Not found";
                    ctx.response.status = 404;
                    break;
                case Status.UnprocessableEntity:
                    ctx.response.body = "Missing field(s)";
                    ctx.response.status = 422;
                    break;

                default:
                    ctx.response.status = 400;
                    ctx.response.body = "Unknown error";
            }
        } else {
            // rethrow if you can't handle the error
            ctx.response.status = 500;
            ctx.response.body = err.toString()
            throw err;
        }
    }
});