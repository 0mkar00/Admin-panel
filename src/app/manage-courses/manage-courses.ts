import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './manage-courses.html',
  styleUrl: './manage-courses.scss',
})
export class ManageCoursesComponent {
  editingCourseId: string | null = null;
  editingCourseData: any = {};

  get courses(): Course[] {
    return this.stateService.courses;
  }

  get totalEnrolled(): number {
    return this.courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  }

  constructor(public stateService: StateService) {}

  startEdit(course: Course) {
    this.editingCourseId = course.id;
    this.editingCourseData = { ...course };
  }

  cancelEdit() {
    this.editingCourseId = null;
    this.editingCourseData = {};
  }

  saveCourse(originalCourse: Course) {
    if (this.editingCourseData.name.trim() && this.editingCourseData.price.trim()) {
      originalCourse.name = this.editingCourseData.name;
      originalCourse.description = this.editingCourseData.description;
      originalCourse.level = this.editingCourseData.level;
      originalCourse.price = this.editingCourseData.price;
      this.cancelEdit();
    }
  }

  deleteCourse(course: Course) {
    if (confirm(`Are you sure you want to delete ${course.name}?`)) {
      this.stateService.courses = this.stateService.courses.filter((c) => c.id !== course.id);
      this.cancelEdit();
    }
  }
}
