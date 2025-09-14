import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSonnerToaster , toast } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSonnerToaster,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly toast=toast;
  protected readonly title = signal('todo-app');
}
