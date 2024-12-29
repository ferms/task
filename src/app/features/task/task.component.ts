import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ButtonModule } from 'primeng/button';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-task',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    CommonModule,
    TaskDialogComponent,
    TaskTableComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  _tasks = signal<Task[]>([]);
  public totalRecords = signal<number>(0);
  public page = signal<number>(1);
  selectedTask: Task = { title: '', body: '', id: '' };
  public rows = signal<number>(5);
  displayModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);

  private readonly taskService = inject(TaskService);
  private readonly messageService = inject(MessageService);
  private readonly _confirmationService = inject(ConfirmationService);

  public tasks = computed<Task[]>(() => {
    return this._tasks() ?? [];
  });

  ngOnInit() {
    this.loadTasks();
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.taskService.fetchAllTasks().subscribe((tasks) => {
      this.totalRecords.set(tasks.length);
    });
  }

  loadTasks() {
    this.taskService.fetchTasks(this.page(), this.rows()).subscribe((tasks) => {
      this._tasks.set(tasks);
    });
  }

  onPageChange(event: any) {
    this.page.set(event.page);
    this.rows.set(event.rows);
    this.loadTasks();
  }

  openAddTaskModal() {
    this.selectedTask = { title: '', body: '', id: '' };
    this.isEditing.set(false);
    this.displayModal.set(true);
  }

  editTask(id: string) {
    const taskToEdit = this._tasks().find((t) => t.id === id.toString());
    if (taskToEdit) {
      this.selectedTask = { ...taskToEdit };
      this.isEditing.set(true);
      this.displayModal.set(true);
    }
  }

  saveTask(task: Task) {
    if (this.isEditing()) {
      this.taskService.updateTask(task.id, task).subscribe({
        next: (updatedTask) => {
          const index = this._tasks().findIndex((t) => t.id === updatedTask.id);
          if (index !== -1) {
            this._tasks()[index] = updatedTask;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tarea actualizada correctamente',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al intentar actualizar la tarea.',
          });
        },
      });
    } else {
      this.page.set(1);
      this.loadTasks();
      task.id = uuidv4();
      this.taskService.createTask(task).subscribe({
        next: (newTask) => {
          this._tasks().unshift(newTask);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tarea creada correctamente',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al intentar crear la tarea.',
          });
        },
      });
    }
    this.displayModal.set(false);
  }

  deleteTask(id: string) {
    this._confirmationService.confirm({
      header: 'Estas seguro?',
      message: 'Por favor confirme para continuar.',
      accept: () => {
        this.taskService.deleteTask(id).subscribe(() => {
          const index = this._tasks().findIndex((t) => t.id === id);
          if (index !== -1) {
            this._tasks().splice(index, 1);
          }
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Tarea eliminada correctamente',
          });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
