import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cors from 'cors'
import connectDB from './database/config';
import authRoutes from './routes/authRoutes';
import protectedRoutes from './routes/protectedRoutes';
import noteRoutes from './routes/noteRoutes'; // <-- 1. IMPORTAR AS NOVAS ROTAS
import { errorHandler } from './middlewares/erroMiddleware';
import logger from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conecta ao Banco de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de boas-vindas para a raiz da API
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API do MiniProjeto está no ar!',
    status: 'OK',
    timestamp: new Date().toISOString() 
  });
});

// Rotas da API
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/notes', noteRoutes); 

// Middleware de Erro (deve ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});