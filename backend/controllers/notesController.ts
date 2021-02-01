import {Router} from "../deps.ts";
import {notes} from "../data/notes.ts";
import {contextType} from "../types.ts";

const getAllNotes = (context: contextType) => {
    context.response.body = notes;
}

const getNote = (context: contextType) => {
    if (context.params && context.params.id && notes.find(note => note.id === Number(context.params.id))) {
        context.response.body = notes.find(note => note.id === Number(context.params.id));
    } else {
        context.response.status = 404
    }
}

const notesRouter = new Router();

notesRouter
    .get("/notes", getAllNotes)
    .get("/notes/:id", getNote);

export {
    notesRouter
}