import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'todosFilter',
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], filter: string) {
    if (!filter) {
      return todos;
    }
    const term = filter.trim().toLowerCase();
    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(term);
    });
  }
}
