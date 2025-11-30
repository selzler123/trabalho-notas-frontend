import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProfessorDashboardComponent } from './pages/professor-dashboard/professor-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProfessorDashboardComponent],
  templateUrl: './app.html',  // ← Use o nome CORRETO do arquivo
  styleUrl: './app.css'       // ← Use o nome CORRETO do arquivo
})
export class App {
  title = 'trabalho-notas-frontend';
}