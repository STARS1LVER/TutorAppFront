
import { Routes } from '@angular/router';

export const StudentsRoutes: Routes = [
    {
          path: 'list-subjects',
          loadComponent: () => import('./pages/subject/subject.component')
    },
    {
      path: 'subject-detail/:id',
      loadComponent: () => import('./pages/subject-info/subject-info.component')
    },


    {
        path: '**',
        redirectTo: 'list-subjects'
    }
   
];
