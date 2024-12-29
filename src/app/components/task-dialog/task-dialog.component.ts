import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-dialog',
  imports: [DialogModule, ButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  @Input() displayModal = false;
  @Input() isEditing = false;
  @Input() task: Task = { title: '', body: '', id: 0 };

  @Output() saveTask = new EventEmitter<Task>();
  @Output() closeDialog = new EventEmitter<void>();

  taskForm: FormGroup;
  private readonly fb = inject(FormBuilder);
  constructor() {
    this.taskForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnChanges() {
    if (this.isEditing) {
      this.taskForm.patchValue(this.task);
    } else {
      this.taskForm.reset();
    }
  }

  save() {
    if (this.taskForm.valid) {
      this.saveTask.emit(this.taskForm.value);
    }
  }

  hideDialog() {
    this.closeDialog.emit();
  }
}
