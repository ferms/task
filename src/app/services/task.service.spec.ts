import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

// Mock data
const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', body: 'Hola Mundo 1' },
  { id: '2', title: 'Task 2', body: 'Hola Mundo 2' },
];

const mockTask: Task = { id: '1', title: 'Task 1', body: 'Hola Mundo 1' };

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    service.fetchAllTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks); // Simulate response
  });

  it('should fetch tasks with pagination', () => {
    const page = 1;
    const limit = 2;

    service.fetchTasks(page, limit).subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?page=${page}&limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    service.createTask(mockTask).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTask);
    req.flush(mockTask);
  });

  it('should update an existing task', () => {
    const updatedTask: Task = { id: '1', title: 'Updated Task 1', body: 'Hola Mundo 1' };

    service.updateTask(updatedTask.id, updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedTask.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

  
});