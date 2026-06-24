import { Routes } from '@angular/router';
import { authGuard } from './auth';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { StudentsListComponent } from './students-list/students-list';
import { AddTeacherComponent } from './add-teacher/add-teacher';
import { ManageCoursesComponent } from './manage-courses/manage-courses';
import { ViewPaymentsComponent } from './view-payments/view-payments';
import { AssignPracticeComponent } from './assign-practice/assign-practice';
import { SendFeedbackComponent } from './send-feedback/send-feedback';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'students',
        component: StudentsListComponent,
      },
      {
        path: 'add-teacher',
        component: AddTeacherComponent,
      },
      {
        path: 'manage-courses',
        component: ManageCoursesComponent,
      },
      {
        path: 'payments',
        component: ViewPaymentsComponent,
      },
      {
        path: 'assign-practice',
        component: AssignPracticeComponent,
      },
      {
        path: 'feedback',
        component: SendFeedbackComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
