import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storagekey = 'Todos';
  todos = signal<Todo[]>([]);
  id = signal<number>(1);

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    const data = localStorage.getItem(this.storagekey);
    if (data) {
      const todos: Todo[] = JSON.parse(data);
      this.todos.set(todos);
      if (todos.length > 0) {
        this.id.set(todos[todos.length - 1].id + 1);
      }
      return this.todos();
    }
    return [];
  }

  saveTodos() {
    localStorage.setItem(this.storagekey, JSON.stringify(this.todos()));
  }

  addNewTodo(title: string) {
    const todo: Todo = { id: this.id(), title, completed: false };
    this.todos.update((list) => [...list, todo]);
    this.id.set(this.id() + 1);
    this.saveTodos();
    toast.success('Todo Added Successfully');
  }

  deleteTodoItem(todoItem: Todo) {
    this.todos.update((todos) => {
      return todos.filter((todo) => todo.id !== todoItem.id);
    });
    this.saveTodos();
    toast.success('Todo Deleted Successfully');
  }

  updateTodoItem(todoItem: Todo) {
    this.todos.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return { ...todo, title: todoItem.title };
        }
        return todo;
      });
    });
    this.saveTodos();
    toast.success('Todo Modified Successfully');
  }

  clearTodos() {
    localStorage.removeItem(this.storagekey);
    this.todos.set([]);
    toast.success('All Todos Cleared Successfully');
  }
}
