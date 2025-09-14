import { StatusTodosFilterPipe } from './status-todos-filter-pipe';

describe('StatusTodosFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusTodosFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
