import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'welcome-page',
        title: 'Welcome Page',
        loadComponent: () => import('./features/public/welcome-page/welcome-page.component')
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./features/auth/register/register.component')
    }

];
