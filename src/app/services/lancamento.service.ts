import { Injectable } from '@angular/core';
import { Lancamento } from '../models/lancamento.model';
import { Falta } from '../models/falta.model'; // IMPORTE SEPARADO

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  
  salvarLancamentos(lancamentos: Lancamento[]): void {
    console.log('Lançamentos salvos:', lancamentos);
    localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
    alert('Lançamentos salvos com sucesso!');
  }

  calcularMediaFinal(lancamento: Lancamento): number {
    return (lancamento.notas.bimestre1 + lancamento.notas.bimestre2) / 2;
  }

  calcularTotalFaltas(faltas: Falta[]): number {
    return faltas.filter(falta => falta.falta).length;
  }
}