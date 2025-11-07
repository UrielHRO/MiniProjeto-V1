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
    
        const loginResponse = await authService.loginUser(req.body); 

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