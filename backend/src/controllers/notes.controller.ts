import { RequestHandler } from "express";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

interface NoteBody {
  title: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

interface DeleteNoteParams {
  id: string;
}

export const deleteNote: RequestHandler<
  DeleteNoteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

interface UpdateBodyParams {
  id: string;
}

interface UpdateNoteBody {
  title: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateBodyParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
