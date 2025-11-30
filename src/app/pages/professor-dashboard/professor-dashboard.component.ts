import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Disciplina } from '../../models/disciplina.model';
import { Lancamento } from '../../models/lancamento.model';
import { Falta } from '../../models/falta.model';
import { Aluno } from '../../models/aluno.model';
import { Professor } from '../../models/professor.model';
import { LancamentoService } from '../../services/lancamento.service';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent {
  disciplinas: Disciplina[] = [];
  disciplinaSelecionada: Disciplina | null = null;
  lancamentos: Lancamento[] = [];
  colunasExibidas = ['aluno', 'nota1', 'faltas1', 'nota2', 'faltas2', 'media'];

  constructor(private lancamentoService: LancamentoService) {
    this.carregarDisciplinas();
  }

  carregarDisciplinas() {
    this.disciplinas = [
      {
        id: 1,
        nome: 'Desenvolvimento FrontEnd',
        professor: { id: 1, nome: 'Paulo H. P. Santos' },
        alunos: [
          { id: 1, nome: 'João Silva', matricula: '2023001' },
          { id: 2, nome: 'Maria Santos', matricula: '2023002' },
        ]
      }
    ];
  }

  selecionarDisciplina(disciplina: Disciplina) {
    this.disciplinaSelecionada = disciplina;
    this.inicializarLancamentos();
  }

  inicializarLancamentos() {
    if (!this.disciplinaSelecionada) return;
    this.lancamentos = this.disciplinaSelecionada.alunos.map(aluno => ({
      aluno,
      disciplina: this.disciplinaSelecionada!,
      notas: { bimestre1: 0, bimestre2: 0 },
      faltas: {
        bimestre1: this.gerarArrayFaltas(),
        bimestre2: this.gerarArrayFaltas()
      }
    }));
  }

  gerarArrayFaltas(): Falta[] {
    return Array.from({ length: 30 }, (_, i) => ({ dia: i + 1, falta: false }));
  }

  salvarLancamentos() {
    this.lancamentoService.salvarLancamentos(this.lancamentos);
  }

  calcularMedia(lancamento: Lancamento): number {
    return this.lancamentoService.calcularMediaFinal(lancamento);
  }

  calcularTotalFaltas(faltas: Falta[]): number {
    return this.lancamentoService.calcularTotalFaltas(faltas);
  }

  atualizarFaltasBimestre(faltas: Falta[], event: any) {
    const totalFaltas = parseInt(event.target.value) || 0;
    for (let i = 0; i < faltas.length; i++) {
      faltas[i].falta = i < totalFaltas;
    }
  }
}