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

        // 2. Chama o seu service (o do print 'image_141423.png')
        // Ele vai retornar o token OU vai 'jogar' (throw) um erro 401
        const loginResponse = await authService.loginUser({ email, password }); 

        // 3. Se o service NÃO jogou um erro, o login foi um sucesso.
        return res.status(200).json(loginResponse);

    } catch (error: any) {
        // 4. AQUI ESTÁ A CORREÇÃO!
        // Nós "pegamos" o erro que o service 'jogou'
        // ex: { status: 401, message: 'Credenciais inválidas.' }

        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor.';
        
        // 5. E o transformamos em uma resposta JSON de verdade.
        // O frontend vai receber isso e mostrar o toast "Credenciais inválidas."
        return res.status(status).json({ message });
    }
};


export const getProtectedData = (req: any, res: any) => {
  res.json({ message: "Rota de teste OK" });
};