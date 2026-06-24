import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StateService } from '../state.service';

export interface Course {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  enrolledStudents: number;
  description: string;
  price: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './manage-courses.html',
  styleUrl: './manage-courses.scss',
})
export class ManageCoursesComponent {
  get courses(): Course[] {
    return this.stateService.courses;
  }

  constructor(public stateService: StateService) {}
}
