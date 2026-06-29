import { Injectable } from '@angular/core';

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

export interface Teacher {
  id: string;
  name: string;
  email: string;
  mobile: string;
  experience: string;
  specialization: string;
  status: 'Active' | 'Inactive';
  avatarColor: string;
}

export interface PendingVideo {
  id: string;
  studentName: string;
  course: string;
  submittedDate: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  students: Student[] = [
    {
      id: 'STU001',
      name: 'Rahul Sharma',
      email: 'rahul@mail.com',
      contact: '+91 98765xxxxx',
      course: 'Guitar Beginner',
      status: 'Active',
      joinDate: '12 Jan 2026',
      avatarColor: '#4E5CF5',
      progress: {
        lessonsCompleted: '12/20',
        lessonsCompletedPct: 60,
        attendance: '85%',
        attendancePct: 85,
        practiceScore: '78/100',
        practiceScorePct: 78,
      },
      payment: {
        plan: 'Monthly ₹5000',
        lastPaid: '10 June 2026',
        status: 'Paid',
      },
      activities: [
        { text: 'Joined course - 2 May' },
        { text: 'Completed Lesson 5' },
        { text: 'Missed class - 12 June' },
      ],
    },
    {
      id: 'STU002',
      name: 'Priya Patil',
      email: 'priya@mail.com',
      contact: '+91 87654xxxxx',
      course: 'Guitar Advanced',
      status: 'Inactive',
      joinDate: '18 Feb 2026',
      avatarColor: '#FFB020',
      progress: {
        lessonsCompleted: '4/20',
        lessonsCompletedPct: 20,
        attendance: '92%',
        attendancePct: 92,
        practiceScore: '88/100',
        practiceScorePct: 88,
      },
      payment: {
        plan: 'Monthly ₹5000',
        lastPaid: '15 May 2026',
        status: 'Pending',
      },
      activities: [
        { text: 'Joined course - 10 May' },
        { text: 'Completed Lesson 1' },
        { text: 'Attended orientation - 12 May' },
      ],
    },
    {
      id: 'STU003',
      name: 'Amit Verma',
      email: 'amit.verma@mail.com',
      contact: '+91 99112xxxxx',
      course: 'Guitar Intermediate',
      status: 'Active',
      joinDate: '05 Mar 2026',
      avatarColor: '#10B981',
      progress: {
        lessonsCompleted: '16/20',
        lessonsCompletedPct: 80,
        attendance: '90%',
        attendancePct: 90,
        practiceScore: '92/100',
        practiceScorePct: 92,
      },
      payment: {
        plan: 'Quarterly ₹10000',
        lastPaid: '01 June 2026',
        status: 'Paid',
      },
      activities: [
        { text: 'Submitted assignment 4 - 15 June' },
        { text: 'Completed lesson 12 - 18 June' },
        { text: 'Attended masterclass - 20 June' },
      ],
    },
    {
      id: 'STU004',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@mail.com',
      contact: '+91 88776xxxxx',
      course: 'Guitar Beginner',
      status: 'Active',
      joinDate: '22 Mar 2026',
      avatarColor: '#EC4899',
      progress: {
        lessonsCompleted: '8/20',
        lessonsCompletedPct: 40,
        attendance: '80%',
        attendancePct: 80,
        practiceScore: '70/100',
        practiceScorePct: 70,
      },
      payment: {
        plan: 'Monthly ₹5000',
        lastPaid: '18 May 2026',
        status: 'Unpaid',
      },
      activities: [
        { text: 'Joined course - 22 May' },
        { text: 'Missed class - 05 June' },
        { text: 'Completed Lesson 3 - 12 June' },
      ],
    },
    {
      id: 'STU005',
      name: 'Rohan Das',
      email: 'rohan.das@mail.com',
      contact: '+91 77665xxxxx',
      course: 'Guitar Advanced',
      status: 'Inactive',
      joinDate: '10 Apr 2026',
      avatarColor: '#8B5CF6',
      progress: {
        lessonsCompleted: '2/20',
        lessonsCompletedPct: 10,
        attendance: '50%',
        attendancePct: 50,
        practiceScore: '60/100',
        practiceScorePct: 60,
      },
      payment: {
        plan: 'Monthly ₹5000',
        lastPaid: '10 April 2026',
        status: 'Pending',
      },
      activities: [
        { text: 'Joined course - 10 April' },
        { text: 'Missed class - 17 April' },
        { text: 'Inactive for 2 weeks' },
      ],
    },
    {
      id: 'STU006',
      name: 'Ananya Sen',
      email: 'ananya.sen@mail.com',
      contact: '+91 99887xxxxx',
      course: 'Guitar Beginner',
      status: 'Active',
      joinDate: '01 May 2026',
      avatarColor: '#06B6D4',
      progress: {
        lessonsCompleted: '10/20',
        lessonsCompletedPct: 50,
        attendance: '95%',
        attendancePct: 95,
        practiceScore: '85/100',
        practiceScorePct: 85,
      },
      payment: {
        plan: 'Yearly ₹15000',
        lastPaid: '01 May 2026',
        status: 'Paid',
      },
      activities: [
        { text: 'Joined course - 01 May' },
        { text: 'Completed Lesson 4 - 15 May' },
        { text: 'Perfect practice run - 20 May' },
      ],
    },
    {
      id: 'STU007',
      name: 'Vikram Malhotra',
      email: 'vikram.m@mail.com',
      contact: '+91 88990xxxxx',
      course: 'Guitar Advanced',
      status: 'Active',
      joinDate: '15 May 2026',
      avatarColor: '#F59E0B',
      progress: {
        lessonsCompleted: '18/20',
        lessonsCompletedPct: 90,
        attendance: '98%',
        attendancePct: 98,
        practiceScore: '95/100',
        practiceScorePct: 95,
      },
      payment: {
        plan: 'Quarterly ₹10000',
        lastPaid: '15 May 2026',
        status: 'Paid',
      },
      activities: [
        { text: 'Completed Lesson 15 - 02 June' },
        { text: 'Perfect practice score - 10 June' },
        { text: 'Booked recital class - 15 June' },
      ],
    },
  ];

  courses: Course[] = [
    {
      id: 'CRS001',
      name: 'Guitar Beginner',
      level: 'Beginner',
      lessonsCount: 20,
      enrolledStudents: 3,
      description:
        'Master the basics of guitar, including tuning, basic chords, and simple strumming patterns.',
      price: '₹999/month',
      icon: 'music_note',
      color: '#4E5CF5',
    },
    {
      id: 'CRS002',
      name: 'Guitar Intermediate',
      level: 'Intermediate',
      lessonsCount: 20,
      enrolledStudents: 1,
      description:
        'Bridge the gap between chords and full songs. Learn scales, barre chords, and fingerpicking.',
      price: '999/month',
      icon: 'queue_music',
      color: '#10B981',
    },
    {
      id: 'CRS003',
      name: 'Guitar Advanced',
      level: 'Advanced',
      lessonsCount: 20,
      enrolledStudents: 3,
      description:
        'Elevate your playing with complex solos, music theory, advanced fingerstyle, and improvisation.',
      price: '₹999/month',
      icon: 'album',
      color: '#8B5CF6',
    },
  ];

  teachers: Teacher[] = [
    {
      id: 'TCH001',
      name: 'Amit Trivedi',
      email: 'amit.t@chordz.com',
      mobile: '+91 9811122233',
      experience: '6 Years',
      specialization: 'Guitar',
      status: 'Active',
      avatarColor: '#4E5CF5',
    },
    {
      id: 'TCH002',
      name: 'Sunidhi Chauhan',
      email: 'sunidhi@chordz.com',
      mobile: '+91 9822233344',
      experience: '8 Years',
      specialization: 'Vocal',
      status: 'Active',
      avatarColor: '#EC4899',
    },
    {
      id: 'TCH003',
      name: 'Zakir Hussain',
      email: 'zakir@chordz.com',
      mobile: '+91 9833344455',
      experience: '15 Years',
      specialization: 'Drums',
      status: 'Active',
      avatarColor: '#F59E0B',
    },
    {
      id: 'TCH004',
      name: 'AR Rahman',
      email: 'rahman@chordz.com',
      mobile: '+91 9844455566',
      experience: '12 Years',
      specialization: 'Keyboard',
      status: 'Active',
      avatarColor: '#8B5CF6',
    },
    {
      id: 'TCH005',
      name: 'Pritam Chakraborty',
      email: 'pritam@chordz.com',
      mobile: '+91 9855566677',
      experience: '10 Years',
      specialization: 'Piano',
      status: 'Inactive',
      avatarColor: '#10B981',
    },
  ];

  pendingVideos: PendingVideo[] = [
    {
      id: 'VID001',
      studentName: 'Rahul Sharma',
      course: 'Guitar Beginner',
      submittedDate: '21 June 2026',
      videoUrl: 'video1.mp4',
    },
    {
      id: 'VID002',
      studentName: 'Priya Patil',
      course: 'Guitar Advanced',
      submittedDate: '22 June 2026',
      videoUrl: 'video2.mp4',
    },
    {
      id: 'VID003',
      studentName: 'Amit Verma',
      course: 'Guitar Intermediate',
      submittedDate: '22 June 2026',
      videoUrl: 'video3.mp4',
    },
    {
      id: 'VID004',
      studentName: 'Sneha Reddy',
      course: 'Guitar Beginner',
      submittedDate: '23 June 2026',
      videoUrl: 'video4.mp4',
    },
    {
      id: 'VID005',
      studentName: 'Rohan Das',
      course: 'Guitar Advanced',
      submittedDate: '23 June 2026',
      videoUrl: 'video5.mp4',
    },
    {
      id: 'VID006',
      studentName: 'Ananya Sen',
      course: 'Guitar Beginner',
      submittedDate: '23 June 2026',
      videoUrl: 'video6.mp4',
    },
    {
      id: 'VID007',
      studentName: 'Vikram Malhotra',
      course: 'Guitar Advanced',
      submittedDate: '23 June 2026',
      videoUrl: 'video7.mp4',
    },
    {
      id: 'VID008',
      studentName: 'Rahul Sharma',
      course: 'Guitar Beginner',
      submittedDate: '24 June 2026',
      videoUrl: 'video8.mp4',
    },
    {
      id: 'VID009',
      studentName: 'Amit Verma',
      course: 'Guitar Intermediate',
      submittedDate: '24 June 2026',
      videoUrl: 'video9.mp4',
    },
    {
      id: 'VID010',
      studentName: 'Sneha Reddy',
      course: 'Guitar Beginner',
      submittedDate: '24 June 2026',
      videoUrl: 'video10.mp4',
    },
    {
      id: 'VID011',
      studentName: 'Vikram Malhotra',
      course: 'Guitar Advanced',
      submittedDate: '24 June 2026',
      videoUrl: 'video11.mp4',
    },
    {
      id: 'VID012',
      studentName: 'Priya Patil',
      course: 'Guitar Advanced',
      submittedDate: '25 June 2026',
      videoUrl: 'video12.mp4',
    },
    {
      id: 'VID013',
      studentName: 'Rohan Das',
      course: 'Guitar Advanced',
      submittedDate: '25 June 2026',
      videoUrl: 'video13.mp4',
    },
    {
      id: 'VID014',
      studentName: 'Ananya Sen',
      course: 'Guitar Beginner',
      submittedDate: '25 June 2026',
      videoUrl: 'video14.mp4',
    },
    {
      id: 'VID015',
      studentName: 'Rahul Sharma',
      course: 'Guitar Beginner',
      submittedDate: '25 June 2026',
      videoUrl: 'video15.mp4',
    },
  ];

  get totalPaymentsAmount(): number {
    return this.students
      .filter((s) => s.payment.status === 'Paid')
      .reduce((sum, s) => {
        const match = s.payment.plan.match(/₹?(\d+)/);
        const amount = match ? parseInt(match[1], 10) : 0;
        return sum + amount;
      }, 0);
  }
}
