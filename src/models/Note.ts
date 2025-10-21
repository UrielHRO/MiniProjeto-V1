import mongoose, { Document, Schema, model } from 'mongoose';

interface INote extends Document {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'O título é obrigatório.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'O conteúdo é obrigatório.'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default model<INote>('Note', NoteSchema);