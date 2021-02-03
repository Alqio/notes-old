import {Router} from "../deps.ts";
import {notes} from "../data/notes.ts";
import {contextType} from "../types.ts";
import {selectNote} from "../db.ts";

const getAllNotes = async (context: contextType) => {
    context.response.body = notes;
}

const getNote = async (context: contextType) => {
    if (context.params && context.params.id) {
        const note = await selectNote(Number(context.params.id))
        if (note) {
            context.response.body = note;
        }
    }
    context.response.status = 404
}

const postNote = async (context: contextType) => {
    if (context.request.hasBody) {
        const body = await context.request.body().value;
        const note = {
            id: notes.length,
            name: body.name,
            link: body.link,
            tags: body.tags,
            date: new Date()
        };
        notes.push(note);
        context.response.status = 201
        context.response.body = note
    } else {
        context.response.status = 422
    }
}

const putNote = async (context: contextType) => {
    if (context.request.hasBody) {
        const body = await context.request.body().value;
        const id = Number(context.params.id)
        if (notes.find(note => note.id === id)) {
            const newNote = {
                id: id,
                name: body.name,
                link: body.link,
                tags: body.tags,
                date: new Date()
            }
            const index = notes.findIndex(note => note.id === id)
            notes[index] = newNote;
            context.response.status = 204
            context.response.body = newNote
        } else {
            context.response.status = 404
        }
    } else {
        context.response.status = 422
    }
}


const deleteNote = (context: contextType) => {
    context.response.status = 501
}

const notesRouter = new Router();

notesRouter
    .get("/notes", getAllNotes)
    .post("/notes", postNote)
    .put("/notes/:id", putNote)
    .get("/notes/:id", getNote)
    .delete("/notes/:id", deleteNote);

export {
    notesRouter
}