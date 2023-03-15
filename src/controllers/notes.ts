import { RequestHandler } from "express";
import mongoose from "mongoose";
import NoteModel from "../models/Notes";
import { errMsg, successMsg } from "../util/responseMsg";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res) => {
    const authenticatedUserId = req.session.userId;
        // assertIsDefined(authenticatedUserId);
    const notes = await NoteModel.find({ userId: authenticatedUserId });
    if (notes.length === 0) {
         return errMsg(404, 'bad request', 'no notes found', res)
    }
       successMsg(200, 'success', notes, res)
};

export const getNote: RequestHandler = async (req, res) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

        assertIsDefined(authenticatedUserId);

  if (!mongoose.isValidObjectId(noteId)) {
    return errMsg(400, 'error', 'invalid note id', res)
  }

        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
         return errMsg(404, 'error', 'notes not found', res)
        }

        if (!note.userId.equals(authenticatedUserId)) {
            return errMsg(401, 'error', 'you cannit access this note', res)
        }

         successMsg(200, 'success', note, res)
};


export const createNote: RequestHandler = async (req, res) => {
  const title = req.body.title
  const text = req.body.text
  
    const authenticatedUserId = req.session.userId;
        assertIsDefined(authenticatedUserId);

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title,
            text
        });

        successMsg(201, 'success', newNote, res)
};

export const updateNote: RequestHandler = async (req, res) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
          return errMsg(400, 'error', 'invalid note id', res)
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            return errMsg(404, 'error', 'note not found', res)
        }

        if (!note.userId.equals(authenticatedUserId)) {
           return errMsg(401, 'error', 'you cannot acces this note', res)
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

       return successMsg(200, 'success', updatedNote, res)
   
};

export const deleteNote: RequestHandler = async (req, res) => {
    const noteId = req.params.noteId;
     const authenticatedUserId = req.session.userId;
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            return errMsg(400, 'error', 'invalid note id', res)
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            return errMsg(404, 'error', 'note not found', res)
        }

        if (!note.userId.equals(authenticatedUserId)) {
            return errMsg(401, 'error', 'you cannot access this note', res)
        }

    await note.deleteOne()
    
        successMsg(400, 'success', 'successfully deleted', res)
   
};