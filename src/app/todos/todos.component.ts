import { Component } from '@angular/core';
import { TodosFacade } from './todos.facade';

@Component({
  selector: 'app-todos',
  template: `
    <h2>Todos</h2>

    <p *ngIf="loading$ | async; else todoList">Loading...</p>
    <ng-template #todoList>
      <ul>
        <li *ngFor="let todo of todos$ | async">{{ todo }}</li>
      </ul>
    </ng-template>

    <div>
      <button
        *ngFor="let pageSize of [1, 3, 5]"
        [class.selected]="pageSize === (selectedPageSize$ | async)"
        (click)="onUpdateSelectedPageSize(pageSize)"
      >
        {{ pageSize }}
      </button>
    </div>
  `,
  viewProviders: [TodosFacade],
})
export class TodosComponent {
  todos$ = this.facade.todos$;
  loading$ = this.facade.loading$;
  selectedPageSize$ = this.facade.selectedPageSize$;

  constructor(private facade: TodosFacade) {}

  onUpdateSelectedPageSize(pageSize: number) {
    this.facade.updateSelectedPageSize(pageSize);
  }
}
