import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { HighlightCompletedTodo } from '../../directives/highlight-completed-todo';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodo],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  todo = input.required<Todo>();

  todoChanged = output<Todo>();
  todoDeleted = output<Todo>();
  todoModified = output<Todo>();
  todoToggled() {
    return this.todoChanged.emit(this.todo());
  }

  onDelete() {
    const confirm = window.confirm('Do you want to delete the todo ?');
    if (confirm) {
      return this.todoDeleted.emit(this.todo());
    }
  }

  onModify(){
    return this.todoModified.emit(this.todo())
  }

  openModal() {
    const modal = document.getElementById('modifyModal') as HTMLDialogElement;
    modal.showModal();
  }
}
