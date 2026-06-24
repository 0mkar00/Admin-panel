import { Component, signal, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('dashboard-app');
  isMobile = false;
  isLoginPage = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/' },
    { label: 'Students', icon: 'groups', route: '/students' },
    { label: 'Teachers', icon: 'people', route: '/add-teacher' },
    { label: 'Courses', icon: 'menu_book', route: '/manage-courses' },
    { label: 'Payments', icon: 'credit_card', route: '/payments' },
    { label: 'Practice', icon: 'music_note', route: '/assign-practice' },
    { label: 'Feedback', icon: 'sms', route: '/feedback' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
    this.checkCurrentRoute();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkCurrentRoute();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 1024;
  }

  private checkCurrentRoute() {
    this.isLoginPage = this.router.url.includes('/login');
  }

  logout(): void {
    localStorage.removeItem('admin_auth');
    this.router.navigate(['/login']);
  }
}
