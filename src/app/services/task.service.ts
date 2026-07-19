import { computed, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Task } from '../models/task.model';
import { UIDRandom } from '../core/utils/uid.utils';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private KEY_TASK = "tasks";

  selectedCategory = signal<string | null>(null);
  search = signal('');
  private readonly _allTasks = signal<Task[]>([]);
  readonly allTasks = this._allTasks.asReadonly();

  constructor(private storageService: StorageService) {
    this.getAllTasks();
  }

  filteredTasks = computed(() => {
    const catId = this.selectedCategory();
    const search = this.search().toLowerCase();

    return this.allTasks().filter(t => {
      const matchesInCategory = catId === null || t.categoryId === catId;
      const matchesInSearch = t.title.toLowerCase().includes(search);

      return matchesInCategory && matchesInSearch;
    })
  });

  getAllTasks() {
    const tasks = this.storageService.get(this.KEY_TASK);
    this._allTasks.set(tasks as Task[] ?? []);
  }

  getTaskById(id: string) {
    return this.allTasks().find(c => c.id === id);
  }

  listCompleted(completed: boolean) {
    this._allTasks.set(this.allTasks().filter(t => t.completed === completed));
  }

  saveTask(paramTask: Task) {
    const newTasks = [{ ...paramTask, id: UIDRandom.generateUIDSimple() }, ...this.allTasks()];
    this.storageService.save(this.KEY_TASK, newTasks);
    this._allTasks.set(newTasks);
  }

  update(task: Task) {
    if (this.allTasks().some(c => c.id === task.id)) {
      const toSaveTasks = this.allTasks().map(c => c.id === task.id ? task : c);
      this.storageService.save(this.KEY_TASK, toSaveTasks);
      this._allTasks.set(toSaveTasks);
    } else {
      throw new Error("La tarea a actualizar no existe");
    }
  }

  delete(task: Task) {
    if (this.allTasks().some(c => c.id === task.id)) {
      const filtersTasks = this.allTasks().filter(c => c.id !== task.id);
      this.storageService.save(this.KEY_TASK, filtersTasks);
      this._allTasks.set(filtersTasks);
    } else {
      throw new Error("La tarea a eliminar no existe");
    }
  }
}
