import {Client} from "./deps.ts";

let config;

config = {
    database: Deno.env.get('DB'),
    hostname: Deno.env.get('DB_HOST'),
    password: Deno.env.get('DB_PASSWORD'),
    port: Deno.env.get('DB_PORT'),
    user: Deno.env.get('DB_USER'),
};


const client = new Client(config);

await client.connect();

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