import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todos';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-modify-todo',
  imports: [FormsModule],
  templateUrl: './modify-todo.html',
  styleUrl: './modify-todo.scss',
})
export class ModifyTodo implements OnInit {
  title = signal('');
  todoService = inject(TodoService);
  modifiedTodo = input.required<Todo>();

  ngOnInit(): void {
    this.title.set(this.modifiedTodo().title);
  }

  closeDialog() {
    const modal = document.getElementById('modifyModal') as HTMLDialogElement;
    modal.close();
  }

  modifyTodo() {
    if (this.title() !== '') {
      const updated: Todo = { ...this.modifiedTodo(), title: this.title() };
      this.title.set('');
      this.todoService.updateTodoItem(updated);
    } else {
      toast.error('Type new title');
    }
  }
}
