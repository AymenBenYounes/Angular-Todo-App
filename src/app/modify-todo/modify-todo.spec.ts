import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTodo } from './modify-todo';

describe('ModifyTodo', () => {
  let component: ModifyTodo;
  let fixture: ComponentFixture<ModifyTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
