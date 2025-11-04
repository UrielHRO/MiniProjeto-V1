import Note from '../models/Note';

// Criar uma nova anotação
export const createNote = async (data: { title: string; content: string }, userId: string) => {
  const { title, content } = data;
  const note = await Note.create({ title, content, user: userId });
  return note;
};

// Listar todas as anotações de um usuário (COM A CORREÇÃO)
export const getNotes = async (userId: string, filters: any) => {
  const { title, ...otherFilters } = filters;
  const query: any = { 
    user: userId,
    ...otherFilters // Mantém outros filtros (ex: ?category=trabalho)
  }; 

  if (title && title.length > 0) {
    query.title = {
      $regex: title,   // <-- A palavra-chave "Contém"
      $options: 'i'    // <-- 'i' = case-insensitive (ignora maiúsculas/minúsculas)
    };
  }

  const notes = await Note.find(query).sort({ createdAt: -1 }); // Adicionei um .sort()
  return notes;
};

// Obter uma anotação específica por ID
export const getNoteById = async (noteId: string, userId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw { status: 404, message: 'Anotação não encontrada.' };
  }
  // Verificação de segurança: o usuário da nota é o mesmo do token?
  if (note.user.toString() !== userId) {
    throw { status: 403, message: 'Acesso negado.' };
  }
  return note;
};

// Atualizar uma anotação (PUT ou PATCH)
export const updateNote = async (noteId: string, updateData: any, userId: string) => {
  // A verificação de segurança já está inclusa no getNoteById
  await getNoteById(noteId, userId);
  
  const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, { new: true, runValidators: true });
  return updatedNote;
};

// Deletar uma anotação
export const deleteNote = async (noteId: string, userId: string) => {
  // A verificação de segurança já está inclusa no getNoteById
  await getNoteById(noteId, userId);

  await Note.findByIdAndDelete(noteId);
};