import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    select: false, // Não retorna o password em queries por padrão
  },
}, { timestamps: true });

// Hook para fazer o hash da senha ANTES de salvar no banco
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

export default model<IUser>('User', UserSchema);