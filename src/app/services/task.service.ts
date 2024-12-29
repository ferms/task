import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TaskService  {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private readonly http = inject(HttpClient);

  fetchAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  
  fetchTasks(page: number, limit: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?_page=${page}&_limit=${limit}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
