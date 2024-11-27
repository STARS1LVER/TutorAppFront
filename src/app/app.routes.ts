import { Routes } from '@angular/router';
import { StudentsRoutes } from './features/students/students.routes';
import ContentComponentComponent from './features/layout/content-component/content-component.component';
import { authGuard } from './features/guards/auth.guard';

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
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./features/auth/login/login.component')
    },
    {
        path: 'students',
        component: ContentComponentComponent,
        canActivate: [authGuard],
        children: StudentsRoutes
    },
    {
        path: 'under-construction',
        title: 'Under Construction',
        loadComponent: () => import('./shared/components/under-construction/under-construction.component')
    },

    {
        path:'',
        redirectTo:'welcome-page',
        pathMatch:'full'
    }

];
