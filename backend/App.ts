import {Application} from './deps.ts';
import {serverConfig}  from "./config.ts";
import {errorHandler, logger} from "./middlewares.ts";
import {notesRouter} from "./controllers/notesController.ts";

const app = new Application()

app.use(logger)

app.use(notesRouter.routes());
app.use(notesRouter.allowedMethods());

app.use((ctx: any) => {
    ctx.response.body = 'hello world';
})

app.use(errorHandler)

await app.listen({port: serverConfig.port});
