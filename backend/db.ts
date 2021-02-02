import {Client} from "./deps.ts";

const client = new Client({
    user: "postgres",
    password: "example",
    database: "note",
    hostname: "localhost",
    port: 3306,
});

await client.connect();

export {
    client
};