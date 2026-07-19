import { Component, Input, OnInit } from '@angular/core';
import { IonicComponentsModule } from '../../ionic.components.module';
import { Category } from '../../models/category.model';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { ColorPickerComponent } from "../color-picker/color.picker.component";
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { alertOutline, leafOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category.modal.component.html',
  styleUrls: ['./category.modal.component.scss'],
  standalone: true,
  imports: [IonicComponentsModule, ColorPickerComponent, FormsModule]
})
export class CategoryModalComponent implements OnInit {

  @Input() category: Category | null = null;
  @Input() color: string | null = null;

  model: Category = { title: '', color: 'primary', id: '' };

  constructor(private modalController: ModalController,
    private categoryService: CategoryService,
    private toastController: ToastController) { }

  ngOnInit() {
    if (this.category) {
      this.model = { ...this.category };
    }
  }

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    if (this.categoryService.existsCategorySomeTitle(this.model.title.trim(), this.model.id)) {
      this.showToastTip("Ya existe una categoria con ese nombre", undefined, 'danger');
      return;
    }
    this.modalController.dismiss(this.model);
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
