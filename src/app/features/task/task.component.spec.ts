import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import { MessageService, ConfirmationService } from 'primeng/api';
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
      { id: '1', title: 'Task 1', body: 'Description 1' },
      { id:  '2', title: 'Task 2', body: 'Description 2' },
    ];

    spyOn(taskService, 'fetchTasks').and.returnValue(of(dummyTasks));
    component.ngOnInit();

    expect(taskService.fetchTasks).toHaveBeenCalledWith(component.page(), component.rows());
    expect(component._tasks()).toEqual(dummyTasks);
  });

  it('should add a task', () => {
  
  });

  it('should update a task', () => {
  
  });

  it('should delete a task', () => {
      
  });
});
