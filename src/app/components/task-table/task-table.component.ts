import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Task } from '../../models/task.model';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-task-table',
  imports: [TableModule, ButtonModule,],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() rows: number = 5;
  first: number = 0;
  @Input() totalRecords: number = 100;
  @Output() pageChange = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  onPageChange(event: PaginatorState) {
    const pageInfo = {
      page: Math.floor((event.first ?? 0) / (event.rows ?? 1)) + 1,
      rows: event.rows
    };
    this.pageChange.emit(pageInfo);
  }

  onEditTask(id: number) {
    this.editTask.emit(id);
  }

  onDeleteTask(index: number) {
    this.deleteTask.emit(index);
  }
}
