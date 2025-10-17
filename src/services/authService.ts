import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import logger from '../utils/logger';

// Tipagem das credenciais e do retorno
interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

/**
 * REGISTRO DE USUÁRIO
 */
export const registerUser = async (userData: UserData): Promise<RegisterResponse> => {
  const { name, email, password } = userData;

  // --- Validação ---
  if (!name || !email || !password) {
    throw { status: 400, message: 'Todos os campos são obrigatórios.' };
  }

  // --- Verifica se já existe um usuário com o mesmo e-mail ---
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 409, message: 'Este email já está em uso.' };
  }
  const user = new User({ name, email, password });
  await user.save();

  logger.info(`Usuário criado com sucesso: ${email}`);

  // --- Retorna os dados do usuário sem a senha ---
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

/**
   LOGIN DE USUÁRIO
 */
export const loginUser = async (credentials: UserData): Promise<LoginResponse> => {
  const { email, password } = credentials;

  // --- Validação de campos ---
  if (!email || !password) {
    throw { status: 400, message: 'Email e senha são obrigatórios.' };
  }

  // --- Busca usuário ---
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    throw { status: 401, message: 'Credenciais inválidas.' };
  }

  // --- Verifica senha ---
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Credenciais inválidas- senha - errada' };
  }

  // --- Configurações do JWT ---
 const secret = process.env.JWT_SECRET;
 const expiresIn = (process.env.JWT_EXPIRES_IN || '1h') as jwt.SignOptions['expiresIn'];

  if (!secret) {
    logger.error('Chave JWT não configurada.');
    throw { status: 500, message: 'Erro interno do servidor.' };
  }

 
  const payload = {
    id: user.id, 
    name: user.name,
  };

  const options: SignOptions = { expiresIn };

  // 💡 Aqui está a correção definitiva:
  const token = jwt.sign(payload, secret as Secret, options);

  logger.info(`Login bem-sucedido para o usuário: ${email}`);

  return { token };
};
