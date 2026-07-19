import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { IonicComponentsModule } from '../../ionic.components.module';
import { add, create, trash, addCircleOutline, leafOutline, alertOutline, listOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Category } from '../../models/category.model';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { CategoryModalComponent } from '../../components/category-modal/category.modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule]
})
export class CategoriesComponent implements OnInit {

  constructor(public categoryService: CategoryService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router) {
    addIcons({ add, create, trash, addCircleOutline, listOutline });
  }

  ngOnInit() {
    this.showToastTip("Desliza una categoría hacia la izquierda para ver las opciones");
  }

  async edit(category: Category) {
    const modalComp = await this.modalController.create({
      component: CategoryModalComponent,
      componentProps: { category },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modalComp.present();

    const { data } = await modalComp.onDidDismiss();

    if (data) {
      this.categoryService.update(data);
    }
  }

  async deleteById(category: Category) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: `¿Desea eliminar la categoría ${category.title}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.categoryService.delete(category.id);
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async addCategory() {
    const modalComp = await this.modalController.create({
      component: CategoryModalComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modalComp.present();

    const { data } = await modalComp.onDidDismiss();

    if (data) {
      this.categoryService.save(data);
    }
  }

  goToTasks() {
    this.router.navigate(['/home']);
  }

  private async showToastTip(message: string, duration: number = 2000, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color,
      icon: color == 'success' ? leafOutline : alertOutline
    });
    await toast.present();
  }

}
