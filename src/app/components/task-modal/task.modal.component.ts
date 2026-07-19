import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ModalController } from '@ionic/angular/standalone';
import { IonicComponentsModule } from '../../ionic.components.module';
import { FormsModule } from '@angular/forms';
import { FirebaseConfigService } from '../../services/firebase.config.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task.modal.component.html',
  styleUrls: ['./task.modal.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule, FormsModule]
})
export class TaskModalComponent implements OnInit {

  activeCategory = true;

  @Input() task: Task | null = null;
  @Input() categories: Category[] = [];

  model: Task = { title: '', categoryId: undefined, completed: false, id: '' };

  constructor(private modalController: ModalController, private configService: FirebaseConfigService) { }

  ngOnInit() {
    if (this.task) {
      this.model = { ...this.task };
    }
    this.activeCategory = this.configService.getCategoryActive();
  }

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.model);
  }

}
