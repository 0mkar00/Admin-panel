import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { StateService } from '../state.service';

export interface StatCard {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  title = 'Dashboard';
  subtitle = 'Welcome Admin 👋';

  get stats(): StatCard[] {
    return [
      {
        title: 'Students',
        value: this.stateService.students.length.toString(),
        icon: 'groups',
        bgColor: 'rgba(78, 92, 245, 0.08)',
        iconColor: '#4E5CF5',
      },
      {
        title: 'Courses',
        value:
          this.stateService.courses.length < 10
            ? `0${this.stateService.courses.length}`
            : this.stateService.courses.length.toString(),
        icon: 'menu_book',
        bgColor: 'rgba(78, 92, 245, 0.08)',
        iconColor: '#4E5CF5',
      },
      {
        title: 'Payments',
        value: '₹' + this.stateService.totalPaymentsAmount.toLocaleString('en-IN'),
        icon: 'credit_card',
        bgColor: 'rgba(78, 92, 245, 0.08)',
        iconColor: '#4E5CF5',
      },
      {
        title: 'Pending Videos',
        value: this.stateService.pendingVideos.length.toString(),
        icon: 'videocam',
        bgColor: 'rgba(78, 92, 245, 0.08)',
        iconColor: '#4E5CF5',
      },
    ];
  }

  quickActions: QuickAction[] = [
    { label: 'Students List', icon: 'groups', route: '/students' },
    { label: 'View Payments', icon: 'credit_card', route: '/payments' },
    { label: 'Add Teacher', icon: 'person_add', route: '/add-teacher' },
    { label: 'Assign Practice', icon: 'music_note', route: '/assign-practice' },
    { label: 'Manage Courses', icon: 'menu_book', route: '/manage-courses' },
    { label: 'Send Feedback', icon: 'sms', route: '/feedback' },
  ];

  constructor(
    private router: Router,
    public stateService: StateService,
  ) {}

  logout(): void {
    localStorage.removeItem('admin_auth');
    this.router.navigate(['/login']);
  }
}
