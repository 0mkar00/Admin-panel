import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { StateService, Teacher } from '../state.service';

export interface TeacherForm {
  name: string;
  email: string;
  mobile: string;
  experience: string;
  specialization: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './add-teacher.html',
  styleUrl: './add-teacher.scss',
})
export class AddTeacherComponent {
  teacher: TeacherForm = {
    name: '',
    email: '',
    mobile: '',
    experience: '',
    specialization: '',
    status: 'Active',
  };

  specializations = ['Guitar', 'Piano', 'Vocal', 'Drums', 'Keyboard'];

  get teachers(): Teacher[] {
    return this.stateService.teachers;
  }

  showSuccess = false;
  lastSavedTeacherName = '';

  constructor(public stateService: StateService) {}

  setStatus(status: 'Active' | 'Inactive') {
    this.teacher.status = status;
  }

  toggleTeacherStatus(t: Teacher) {
    t.status = t.status === 'Active' ? 'Inactive' : 'Active';
  }

  deleteTeacher(t: Teacher) {
    this.stateService.teachers = this.stateService.teachers.filter(
      (teacher) => teacher.id !== t.id,
    );
  }

  isFormValid(): boolean {
    return !!(
      this.teacher.name.trim() &&
      this.teacher.email.trim() &&
      this.teacher.mobile.trim() &&
      this.teacher.experience.trim() &&
      this.teacher.specialization
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isFormValid()) {
      const colors = ['#4E5CF5', '#EC4899', '#F59E0B', '#8B5CF6', '#10B981', '#06B6D4'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newTeacher: Teacher = {
        id: `TCH00${this.stateService.teachers.length + 1}`,
        name: this.teacher.name,
        email: this.teacher.email,
        mobile: this.teacher.mobile,
        experience: this.teacher.experience,
        specialization: this.teacher.specialization,
        status: this.teacher.status,
        avatarColor: randomColor,
      };

      this.stateService.teachers.unshift(newTeacher);

      this.lastSavedTeacherName = this.teacher.name;
      this.showSuccess = true;

      this.teacher = {
        name: '',
        email: '',
        mobile: '',
        experience: '',
        specialization: '',
        status: 'Active',
      };

      setTimeout(() => {
        this.showSuccess = false;
      }, 4000);
    }
  }
}
