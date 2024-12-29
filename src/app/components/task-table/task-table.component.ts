import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Task } from '../../models/task.model';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-task-table',
  imports: [TableModule, ButtonModule,],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() rows: number = 5;
  first: number = 0;
  @Input() totalRecords: number = 100;
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Output() editTask = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();

  onPageChange(event: PaginatorState) {
    const pageInfo = {
      page: Math.floor((event.first ?? 0) / (event.rows ?? 1)) + 1,
      rows: event.rows
    };
    this.pageChange.emit(pageInfo);
  }

  onEditTask(id: string) {
    this.editTask.emit(id);
  }

  onDeleteTask(id: string) {
    this.deleteTask.emit(id);
  }
}
