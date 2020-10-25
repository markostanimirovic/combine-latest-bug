import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  getTodos(pageSize: number): Observable<string[]> {
    return of(['todo 1', 'todo 2', 'todo 3', 'todo 4', 'todo 5']).pipe(
      delay(2000),
      map(todos => todos.slice(0, pageSize)),
    );
  }
}
