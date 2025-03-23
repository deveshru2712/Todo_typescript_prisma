import { RequestHandler } from "express";
import prismaClient from "../config/getClient";
import createHttpError from "http-errors";

import { ParamsDictionary } from "express-serve-static-core";

export const getNotes: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw createHttpError(404, "Unable to found your account");
    }

    const notes = await prismaClient.todo.findMany({
      where: { userId: userId },
    });

    if (!notes) {
      res.status(200).json({
        message: "No notes found",
      });
    }

    res.status(200).json({
      notes,
    });
  } catch (error) {
    next(error);
  }
};

interface NoteBody {
  title: string;
  text: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  const id = req.user.id;
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const todo = await prismaClient.todo.create({
      data: { title, text, userId: id },
    });

    res.status(201).json({ todo });
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
  const { id } = req.params;
  const userId = req.user.id;
  try {
    //parsing it to number as it is string

    const noteId = parseInt(id);
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    const todo = await prismaClient.todo.findFirst({ where: { id: noteId } });

    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }

    const deleteTodo = await prismaClient.todo.delete({
      where: {
        id: noteId,
        userId: userId,
      },
    });

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteBody {
  title: string;
  text?: string;
}

export const updateNote: RequestHandler<
  ParamsDictionary & { id: string },
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  try {
  } catch (error) {
    next(error);
  }
};
