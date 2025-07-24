import { Component, signal } from '@angular/core';
import { TaskTrackerComponent } from './tasks/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskTrackerComponent], 
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('task-tracker');
}