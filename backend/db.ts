import {Client} from "./deps.ts";

let config;

config = {
    applicationName: "my_custom_app",
    database: "note",
    hostname: "localhost",
    password: "example",
    port: 3306,
    user: "postgres",
};

config = "postgres://postgres:example@localhost:3306/note?application_name=my_custom_app";

const client = new Client(config);

await client.connect();
await client.end();
const selectNote = async (id: number) => {
    const result = await client.queryObject(
        "SELECT * FROM notes WHERE id=$1",
        id
    );
    const notes = result.rows;
    if (notes.length > 0)
        return notes[0];
    else
        return null;
}


export {
    selectNote
};