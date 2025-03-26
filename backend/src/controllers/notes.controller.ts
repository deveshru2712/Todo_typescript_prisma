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

    const todos = await prismaClient.todo.findMany({
      where: { userId: userId },
    });

    if (!todos) {
      res.status(200).json({
        message: "No todos found",
      });
    }

    res.status(200).json({
      todos,
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

// interface DeleteNoteParams {
//   id: string;
// }

export const deleteNote: RequestHandler<
  ParamsDictionary & { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    //parsing it to number as it is string

    const todoId = parseInt(id);
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    const todo = await prismaClient.todo.findFirst({
      where: { id: todoId, userId: userId },
    });

    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }

    const deleteTodo = await prismaClient.todo.delete({
      where: {
        id: todoId,
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
  text: string;
}

export const updateNote: RequestHandler<
  ParamsDictionary & { id: string },
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { text, title } = req.body;
  try {
    const todoId = parseInt(id);
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw createHttpError(404, "Unable to found User");
    }

    const todo = await prismaClient.todo.update({
      where: {
        id: todoId,
        userId,
      },
      data: {
        text,
        title,
      },
    });

    res.status(200).json({
      todo,
      message: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus: RequestHandler<
  ParamsDictionary & { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;
  try {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const todo = await prismaClient.todo.findUnique({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      throw createHttpError(404, "Todo not found");
    }

    const updateTodo = await prismaClient.todo.update({
      where: { id: todoId, userId: userId },
      data: {
        completed: !todo.completed,
      },
    });

    res.status(200).json({ todo: updateTodo });
  } catch (error) {
    next(error);
  }
};
