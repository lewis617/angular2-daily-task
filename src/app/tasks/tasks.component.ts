import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  filteredTasks: Task[];

  filters = {
    keyWord: '',
    date: ''
  };

  constructor(private route: ActivatedRoute, private tasksService: TasksService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { tasks: Task[] }) => {
        this.tasks = data.tasks;
        this.filterAndSort();
      });
  }

  filterAndSort() {
    this.filteredTasks = this.tasks
      .filter(task => (
          !this.filters.date ||
          new Date(task.date).toDateString() === new Date(this.filters.date).toDateString()
        ) &&
        (
          !this.filters.keyWord ||
          task.user.indexOf(this.filters.keyWord) > -1 ||
          task.content.indexOf(this.filters.keyWord) > -1
        )
      ).sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        } else {
          return 0;
        }
      });
  }

  addTask(content) {
    this.tasksService.addTask(content)
      .subscribe(newTask => {
        this.tasks.push(newTask);
        this.filters = {
          keyWord: '',
          date: ''
        };
        this.filterAndSort();
      })
  }
}
