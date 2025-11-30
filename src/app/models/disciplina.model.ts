import { Professor } from './professor.model';
import { Aluno } from './aluno.model';

export interface Disciplina {
  id: number;
  nome: string;
  professor: Professor;
  alunos: Aluno[];
}