import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Category } from '../models/category.model';
import { UIDRandom } from '../core/utils/uid.utils';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private KEY_CATEGORY = "categories";

  private readonly _allCategories = signal<Category[]>([]);
  readonly allCategories = this._allCategories.asReadonly();

  constructor(private storageService: StorageService) {
    this.getAll();
  }

  getAll() {
    const categories = this.storageService.get(this.KEY_CATEGORY);
    this._allCategories.set(categories as Category[] ?? []);
  }

  getById(id: string) {
    return this.allCategories().find(c => c.id === id);
  }

  existsCategorySomeTitle(title: string, id?: string) {
    return this.allCategories().some(c => c.title === title && c.id !== id);
  }

  save({ color, title }: { color: string, title: string }) {
    const newCategories = [{ title, color, id: UIDRandom.generateUIDSimple() }, ...this.allCategories()];
    this.storageService.save(this.KEY_CATEGORY, newCategories);
    this._allCategories.set(newCategories);
  }

  update(category: Category) {
    if (this.allCategories().some(c => c.id === category.id)) {
      const toSaveCategories = this.allCategories().map(c => c.id === category.id ? category : c);
      this.storageService.save(this.KEY_CATEGORY, toSaveCategories);
      this._allCategories.set(toSaveCategories);
    } else {
      throw new Error("La categoría a actualizar no existe");
    }
  }

  delete(id: string) {
    if (this.allCategories().some(c => c.id === id)) {
      const filtersCategories = this.allCategories().filter(c => c.id !== id);
      this.storageService.save(this.KEY_CATEGORY, filtersCategories);
      this._allCategories.set(filtersCategories);
    } else {
      throw new Error("La categoría a eliminar no existe");
    }
  }
}
