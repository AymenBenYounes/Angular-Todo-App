import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todos';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo {
  title = signal('');
  todoService = inject(TodoService);

  closeDialog() {
    const modal = document.getElementById('addModal') as HTMLDialogElement;
    modal.close();
  }

  addTodo() {
    if (this.title() !== '') {
      this.todoService.addNewTodo(this.title());
      this.title.set('');
    } else {
      toast.error('Type new title');
    }
  }
}
