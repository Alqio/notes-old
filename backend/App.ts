import {config} from './deps.ts';
config();

import {Application} from './deps.ts';
import {serverConfig}  from "./config.ts";
import {errorHandler, logger} from "./middlewares.ts";
import {notesRouter} from "./controllers/notesController.ts";

const app = new Application()

app.use(logger)
app.use(errorHandler)

app.use(notesRouter.routes());
app.use(notesRouter.allowedMethods());

app.use((ctx: any) => {
    ctx.response.body = 'hello world';
})

await app.listen({port: serverConfig.port});
