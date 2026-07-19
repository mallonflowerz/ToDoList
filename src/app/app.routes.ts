import { Routes } from '@angular/router';
import { categoryGuard } from './core/guards/category.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.component').then((m) => m.CategoriesComponent),
        canActivate: [categoryGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
