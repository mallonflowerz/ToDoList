import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { IonicComponentsModule } from '../../ionic.components.module';
import { add, addCircleOutline, albumsOutline, alertOutline, leafOutline, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { TaskModalComponent } from '../../components/task-modal/task.modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule, FormsModule]
})
export class HomeComponent implements OnInit {

  filter = 0;

  constructor(public categoryService: CategoryService,
    public taskService: TaskService,
    private modal: ModalController,
    private alertController: AlertController,
    private router: Router) {
    addIcons({ add, trash, addCircleOutline, albumsOutline });
  }

  ngOnInit() { }

  async addTask() {
    const modalComp = await this.modal.create({
      component: TaskModalComponent,
      componentProps: { categories: this.categoryService.allCategories() },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modalComp.present();

    const { data } = await modalComp.onDidDismiss();

    if (data) {
      this.taskService.saveTask(data);
    }
  }

  async edit(task: Task) {
    const modalComp = await this.modal.create({
      component: TaskModalComponent,
      componentProps: { categories: this.categoryService.allCategories(), task },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modalComp.present();

    const { data } = await modalComp.onDidDismiss();

    if (data) {
      this.taskService.update(data);
    }
  }

  async deleteById(paramTask: Task) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: "¿Realmente desea eliminar la tarea?",
      buttons: [
        { text: 'No, cancelar', role: 'cancel' },
        {
          text: 'Si, eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.delete(paramTask);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }

}
