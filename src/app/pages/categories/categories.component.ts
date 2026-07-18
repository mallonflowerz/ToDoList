import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { IonicComponentsModule } from '../../ionic.components.module';
import { add, create, trash, addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule]
})
export class CategoriesComponent implements OnInit {

  constructor(public categoryService: CategoryService, public taskService: TaskService) {
    addIcons({ add, create, trash, addCircleOutline });
  }

  ngOnInit() { }

  edit(category: Category) {
    this.categoryService.update(category);
  }

  deleteById(id: string) {
    this.categoryService.delete(id);
  }

}
