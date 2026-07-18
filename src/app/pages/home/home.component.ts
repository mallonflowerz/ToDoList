import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { IonicComponentsModule } from '../../ionic.components.module';
import { add, create, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule]
})
export class HomeComponent implements OnInit {

  constructor(public categoryService: CategoryService, public taskService: TaskService) {
    addIcons({ add, create, trash });
  }

  ngOnInit() { }

  edit(category: Category) {
    this.categoryService.update(category);
  }

  deleteById(id: string) {
    this.categoryService.delete(id);
  }

}
