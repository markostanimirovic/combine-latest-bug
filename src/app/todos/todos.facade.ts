import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TodosService } from './todos.service';

interface TodosState {
  todos: string[];
  loading: boolean;
  selectedPageSize: number;
}

const initialState: TodosState = { todos: [], loading: false, selectedPageSize: 1 };
/** workaround **/
// const initialState: TodosState = { todos: [], loading: true, selectedPageSize: 1 };

@Injectable()
export class TodosFacade {
  private store = new BehaviorSubject(initialState);

  todos$ = this.store.pipe(pluck('todos'), distinctUntilChanged());
  loading$ = this.store.pipe(pluck('loading'), distinctUntilChanged());
  selectedPageSize$ = this.store.pipe(pluck('selectedPageSize'), distinctUntilChanged());

  constructor(private todosService: TodosService) {
    this.selectedPageSize$
      .pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap(pageSize => this.todosService.getTodos(pageSize)),
      )
      .subscribe(todos => this.patchState({ todos, loading: false }));
    /** workaround **/
    // this.selectedPageSize$
    //   .pipe(switchMap(pageSize => this.todosService.getTodos(pageSize)))
    //   .subscribe(todos => this.patchState({ todos, loading: false }));

    this.loading$.subscribe(loading => console.log('loading changed', loading));
  }

  updateSelectedPageSize(selectedPageSize: number) {
    this.patchState({ selectedPageSize });
    /** workaround **/
    // this.patchState({ selectedPageSize, loading: true });
  }

  private patchState(partialState: Partial<TodosState>) {
    this.store.next({ ...this.store.value, ...partialState });
  }
}
