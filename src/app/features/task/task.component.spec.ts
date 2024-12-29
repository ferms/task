import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import { MessageService, ConfirmationService, Confirmation } from 'primeng/api';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;
  let messageService: MessageService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskComponent, 
        HttpClientTestingModule, 
        CommonModule,
        TaskDialogComponent,
        TaskTableComponent,
        ButtonModule,
        ConfirmDialogModule,
        ToastModule,
      ],
      providers: [
        provideHttpClientTesting(), 
        TaskService,
        MessageService,
        ConfirmationService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    messageService = TestBed.inject(MessageService);
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const dummyTasks: Task[] = [
      { id: 1, title: 'Task 1', body: 'Description 1' },
      { id: 2, title: 'Task 2', body: 'Description 2' },
    ];

    spyOn(taskService, 'fetchTasks').and.returnValue(of(dummyTasks));
    component.ngOnInit();

    expect(taskService.fetchTasks).toHaveBeenCalledWith(component.page(), component.rows());
    expect(component._tasks()).toEqual(dummyTasks);
  });

  it('should add a task', () => {
    const newTask: Task = { id: 3, title: 'Task 3', body: 'Description 3', email: 'email3@example.com' };

    spyOn(taskService, 'createTask').and.returnValue(of(newTask));
    spyOn(messageService, 'add');

    component.saveTask(newTask);

    expect(taskService.createTask).toHaveBeenCalledWith(newTask);
    expect(component._tasks()[0]).toEqual(newTask);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Tarea creada correctamente'
    });
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: 1, title: 'Updated Task', body: 'Updated Description', email: 'updated@example.com' };
    component._tasks.set([{ id: 1, title: 'Task 1', body: 'Description 1', email: 'email1@example.com' }]);

    spyOn(taskService, 'updateTask').and.returnValue(of(updatedTask));
    spyOn(messageService, 'add');

    component.isEditing = true;
    component.saveTask(updatedTask);

    expect(taskService.updateTask).toHaveBeenCalledWith(updatedTask.id, updatedTask);
    expect(component._tasks()[0]).toEqual(updatedTask);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Tarea actualizada correctamente'
    });
  });

  it('should delete a task', () => {
    const taskToDelete: Task = { id: 1, title: 'Task 1', body: 'Description 1' };
    component._tasks.set([taskToDelete]);
  
    spyOn(taskService, 'deleteTask').and.returnValue(of(void 0));
    spyOn(messageService, 'add');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      if (confirmation.accept) {
        confirmation.accept(); 
      }
      return confirmationService;
    });
  
    component.deleteTask(0);
  
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskToDelete.id);
    expect(component._tasks().length).toBe(0);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'Tarea eliminada correctamente',
    });
  });
  
});
