import { Request, Response, NextFunction } from 'express';
import * as noteService from '../services/noteService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = req.user!.id; // req.user.id vem do middleware de autenticação
    const note = await noteService.createNote({ title, content }, userId);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const filters = req.query; // Pega os filtros da URL (ex: ?title=Reunião)
    const notes = await noteService.getNotes(userId, filters);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const note = await noteService.getNoteById(id, userId);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user!.id;
    const updatedNote = await noteService.updateNote(id, updateData, userId);
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    await noteService.deleteNote(id, userId);
    res.status(204).send(); // 204 No Content para sucesso em deleção
  } catch (error) {
    next(error);
  }
};