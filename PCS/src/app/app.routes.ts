import { Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent},
  {
    path: 'add',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  }
];

export default routes;
