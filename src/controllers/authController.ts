import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        // 1. Pega os dados do body
        const { email, password } = req.body;

        // Ele vai retornar o token ou vai 'lança' (throw) um erro 401
        const loginResponse = await authService.loginUser({ email, password }); 

        // 3. Se o service NÃO 'lançou' um erro, o login foi um sucesso.
        return res.status(200).json(loginResponse);

    } catch (error: any) {
        
        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor.';
        
        return res.status(status).json({ message });
    }
};
export const getProtectedData = (req: any, res: any) => {
  res.json({ message: "Rota de teste OK" });
};