import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    logger.error('MONGO_URI não definida nas variáveis de ambiente.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    logger.info('MongoDB conectado com sucesso.');
  } catch (error) {
    logger.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;