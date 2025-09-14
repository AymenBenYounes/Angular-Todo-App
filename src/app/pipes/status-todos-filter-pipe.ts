import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'statusTodosFilter',
})
export class StatusTodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], status: 'all' | 'complete' | 'incomplete'): Todo[] {
    if (status === 'all') {
      return todos;
    } else if (status === 'complete') {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos.filter((todo) => !todo.completed);
    }
  }
}
