import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { StateService } from '../state.service';

export interface StudentActivity {
  text: string;
}

export interface StudentProgress {
  lessonsCompleted: string;
  lessonsCompletedPct: number;
  attendance: string;
  attendancePct: number;
  practiceScore: string;
  practiceScorePct: number;
}

export interface StudentPayment {
  plan: string;
  lastPaid: string;
  status: 'Paid' | 'Unpaid' | 'Pending';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  contact: string;
  course: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  avatarColor: string;
  progress: StudentProgress;
  payment: StudentPayment;
  activities: StudentActivity[];
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './students-list.html',
  styleUrl: './students-list.scss',
})
export class StudentsListComponent {
  searchTerm = '';
  selectedStatus = 'All';
  selectedCourse = 'All';
  selectedStudent: Student | null = null;

  statuses = ['All', 'Active', 'Inactive'];

  courses = ['All', 'Guitar Beginner', 'Guitar Intermediate', 'Guitar Advanced'];

  get students(): Student[] {
    return this.stateService.students;
  }

  constructor(public stateService: StateService) {}

  displayedColumns: string[] = ['name', 'email', 'contact', 'course', 'status', 'action'];

  get filteredStudents(): Student[] {
    return this.students.filter((student) => {
      const term = this.searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.contact.toLowerCase().includes(term) ||
        student.course.toLowerCase().includes(term);

      const matchesStatus = this.selectedStatus === 'All' || student.status === this.selectedStatus;
      const matchesCourse = this.selectedCourse === 'All' || student.course === this.selectedCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }

  viewInfo(student: Student) {
    this.selectedStudent = student;
  }

  closeInfo() {
    this.selectedStudent = null;
  }

  toggleSuspend(student: Student) {
    if (student.status === 'Suspended') {
      student.status = 'Active';
      student.activities.unshift({ text: 'Account unsuspended' });
    } else {
      student.status = 'Suspended';
      student.activities.unshift({ text: 'Account suspended/blocked' });
    }
  }

  openWhatsApp(student: Student) {
    const cleanNumber = student.contact.replace(/x/gi, '0').replace(/[^\d]/g, '');
    const message = encodeURIComponent(`Hello ${student.name}, this is Chordz Admin.`);
    const url = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}
