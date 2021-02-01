import {serve} from './deps.ts';
import {serverConfig}  from "./config.ts";

const server = serve({...serverConfig});
console.log(`HTTP webserver running at ${serverConfig.hostname}:${serverConfig.port}`);

for await (const request of server) {
    let bodyContent = "Your user-agent is:\n\n";
    bodyContent += request.headers.get("user-agent") || "Unknown";

    request.respond({ status: 200, body: bodyContent });
}