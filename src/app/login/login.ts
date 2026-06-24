import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  password = '';
  errorMessage = '';
  hidePassword = true;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.password === 'admin@beats') {
      localStorage.setItem('admin_auth', 'true');
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Incorrect password. Try again.';
      this.password = '';
    }
  }
}
