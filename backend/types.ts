import {RouterContext} from "./deps.ts";

type contextType = RouterContext<Record<string | number, string | undefined>, Record<string, any>>

interface Note {
    id: number;
    name: string;
    link: string;
    date: Date;
    tags: string[]
}

export type {
    contextType,
    Note
}