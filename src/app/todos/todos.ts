import { Component, inject, OnInit, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todos';
import { TodoItem } from '../components/todo-item/todo-item';
import { TodosFilterPipe } from '../pipes/todos-filter-pipe';
import { FormsModule } from '@angular/forms';
import { StatusTodosFilterPipe } from '../pipes/status-todos-filter-pipe';
import { Router } from '@angular/router';
import { AddTodo } from '../add-todo/add-todo';
import { ModifyTodo } from '../modify-todo/modify-todo';

@Component({
  selector: 'app-todos',
  imports: [TodoItem, FormsModule, TodosFilterPipe, StatusTodosFilterPipe, AddTodo, ModifyTodo],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  id = signal(1);
  loading = true;
  todoService = inject(TodoService);
  todoToModify = signal<Todo>({
    id: 0,
    title: '',
    completed: false,
  });

  constructor(private router: Router) {}

  getToAddTodo() {
    this.router.navigate(['add-todo']);
  }

  openModel() {
    const modal = document.getElementById('addModal') as HTMLDialogElement;
    modal.showModal();
  }

  searchFilter = signal('');
  statusFilter = signal<'all' | 'complete' | 'incomplete'>('all');

  ngOnInit() {
    // simulate loading
    new Promise<void>((resolve) => setTimeout(resolve, 500)).then(() => {
      this.loading = false;
    });
  }

  updateTodos(todoitem: Todo) {
    const updated = this.todoService
      .todos()
      .map((todo) => (todo.id === todoitem.id ? { ...todo, completed: !todo.completed } : todo));
    this.todoService.todos.set(updated);
    this.todoService.saveTodos();
  }

  modifyTodoItem(todoItem: Todo) {
    this.todoToModify.set(todoItem);
    const modal = document.getElementById('modifyModal') as HTMLDialogElement;
    modal.showModal();
  }

  deleteTodoItem(todoItem: Todo) {
    this.todoService.deleteTodoItem(todoItem);
  }

  clearAll() {
    const confirm = window.confirm('Do you want to delete all todos ?');
    if (confirm) {
      this.todoService.clearTodos();
    }
  }
}
