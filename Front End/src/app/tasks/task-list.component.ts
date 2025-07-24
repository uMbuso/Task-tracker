import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common'; 

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
  due: string;
}

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, TitleCasePipe] 
})

export class TaskTrackerComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentFilter: string = 'all';
  newTaskText: string = '';

  ngOnInit(): void {
    // sample tasks 
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : this.getSampleTasks();
    this.filterTasks('all');
  }

  getSampleTasks(): Task[] {
    return [
      { id: 1, text: "Complete quarterly report presentation", completed: false, priority: "high", due: "Today" },
      { id: 2, text: "Review and update project timeline", completed: false, priority: "medium", due: "Tomorrow" },
      { id: 3, text: "Schedule team meeting for next week", completed: true, priority: "low", due: "Completed" },
      { id: 4, text: "Update client documentation", completed: false, priority: "medium", due: "This week" }
    ];
  }

  addTask(): void {
    if (!this.newTaskText.trim()) return;

    const priority = Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low';
    
    this.tasks.push({
      id: Date.now(),
      text: this.newTaskText,
      completed: false,
      priority: priority,
      due: "This week"
    });

    this.newTaskText = '';
    this.saveTasks();
    this.filterTasks(this.currentFilter);
  }

  toggleTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.due = task.completed ? 'Completed' : 'This week';
      this.saveTasks();
      this.filterTasks(this.currentFilter);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.filterTasks(this.currentFilter);
  }

  filterTasks(filter: string): void {
    this.currentFilter = filter;
    this.filteredTasks = this.tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}