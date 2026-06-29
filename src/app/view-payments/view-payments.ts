import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { StateService } from '../state.service';

export interface PaymentHistoryItem {
  month: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export interface PaymentItem {
  id: string;
  studentName: string;
  email: string;
  contact: string;
  courseName: string;
  planName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending';
  avatarColor: string;
  lastPaidDate: string;
  nextDueDate: string;
  paymentMethod: string;
  invoiceId: string;
  paidMonths: number;
  totalMonths: number;
  history: PaymentHistoryItem[];
}

@Component({
  selector: 'app-view-payments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
  templateUrl: './view-payments.html',
  styleUrl: './view-payments.scss',
})
export class ViewPaymentsComponent implements OnInit {
  searchTerm = '';
  selectedStatus = 'All';
  selectedDate = 'June 2026';
  
  dates: string[] = [];
  statuses = ['All', 'Paid', 'Pending'];

  selectedPaymentId: string | null = null;
  notificationMessage = '';
  showNotification = false;

  // Local persistence tracker for cleared historical months
  clearedHistoryMonths: { [studentId: string]: string[] } = {};

  constructor(public stateService: StateService) {}

  ngOnInit() {
    this.selectedPaymentId = null;
    
    const list: string[] = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const startYear = 2026;
    const startMonth = 0; // January
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 to 11
    
    for (let year = startYear; year <= currentYear; year++) {
      const endMonth = (year === currentYear) ? currentMonth : 11;
      for (let m = (year === startYear ? startMonth : 0); m <= endMonth; m++) {
        list.push(`${monthNames[m]} ${year}`);
      }
    }
    this.dates = list.reverse();

    const currentMonthName = monthNames[currentDate.getMonth()];
    const currentMonthYear = `${currentMonthName} ${currentYear}`;
    if (this.dates.includes(currentMonthYear)) {
      this.selectedDate = currentMonthYear;
    } else if (this.dates.length > 0) {
      this.selectedDate = this.dates[0];
    } else {
      this.selectedDate = 'June 2026';
    }
  }

  // Helper to parse date string into a Date object comparison format
  parseMonthYear(dateStr: string): { year: number; month: number } | null {
    if (!dateStr) return null;
    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const cleanStr = dateStr.toLowerCase();
    const yearMatch = cleanStr.match(/\b\d{4}\b/);
    if (!yearMatch) return null;
    const year = parseInt(yearMatch[0], 10);
    
    let month = -1;
    for (let i = 0; i < monthNames.length; i++) {
      if (cleanStr.includes(monthNames[i])) {
        month = i;
        break;
      }
    }
    if (month === -1) return null;
    return { year, month };
  }

  isBeforeOrEqualMonth(dateStr1: string, dateStr2: string): boolean {
    const d1 = this.parseMonthYear(dateStr1);
    const d2 = this.parseMonthYear(dateStr2);
    if (!d1 || !d2) return false;
    if (d1.year !== d2.year) {
      return d1.year < d2.year;
    }
    return d1.month <= d2.month;
  }

  isOnOrAfterMonth(dateStr1: string, dateStr2: string): boolean {
    const d1 = this.parseMonthYear(dateStr1);
    const d2 = this.parseMonthYear(dateStr2);
    if (!d1 || !d2) return false;
    if (d1.year !== d2.year) {
      return d1.year > d2.year;
    }
    return d1.month >= d2.month;
  }

  getMonthsDifference(dateStr1: string, dateStr2: string): number {
    const d1 = this.parseMonthYear(dateStr1);
    const d2 = this.parseMonthYear(dateStr2);
    if (!d1 || !d2) return 0;
    return (d1.year - d2.year) * 12 + (d1.month - d2.month);
  }

  isBillingCycleStart(monthName: string, joinDate: string, planName: string): boolean {
    const diff = this.getMonthsDifference(monthName, joinDate);
    if (diff < 0) return false;
    let planDuration = 1;
    if (planName === 'Quarterly') {
      planDuration = 3;
    } else if (planName === 'Yearly') {
      planDuration = 12;
    }
    return diff % planDuration === 0;
  }

  isMonthPaid(monthName: string, lastPaidDate: string, planName: string, clearedMonths: string[]): boolean {
    if (clearedMonths.includes(monthName)) {
      return true;
    }
    const lastPaidParsed = this.parseMonthYear(lastPaidDate);
    if (!lastPaidParsed) return false;

    let planDuration = 1;
    if (planName === 'Quarterly') {
      planDuration = 3;
    } else if (planName === 'Yearly') {
      planDuration = 12;
    }

    const monthNameParsed = this.parseMonthYear(monthName);
    if (!monthNameParsed) return false;

    // Calculate the end month of the paid period
    let endMonth = lastPaidParsed.month + planDuration - 1;
    let endYear = lastPaidParsed.year;
    if (endMonth > 11) {
      endYear += Math.floor(endMonth / 12);
      endMonth = endMonth % 12;
    }

    if (monthNameParsed.year !== endYear) {
      return monthNameParsed.year < endYear;
    }
    return monthNameParsed.month <= endMonth;
  }

  getNextMonth(dateStr: string): string {
    const parsed = this.parseMonthYear(dateStr);
    if (!parsed) return 'July 2026';
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let nextM = parsed.month + 1;
    let nextY = parsed.year;
    if (nextM > 11) {
      nextM = 0;
      nextY += 1;
    }
    return `${monthNames[nextM]} ${nextY}`;
  }

  // Helper to extract the day from a date string like '12 Jan 2026'
  extractDay(dateStr: string): string {
    if (!dateStr) return '10';
    const match = dateStr.match(/^\d+/);
    return match ? match[0] : '10';
  }

  // Helper to extract course price from StateService.courses (defaults to 999)
  getCoursePrice(courseName: string): number {
    const course = this.stateService.courses.find(
      (c) => c.name.toLowerCase() === courseName.toLowerCase()
    );
    if (course) {
      const match = course.price.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 999;
    }
    return 999;
  }

  // Dynamic mapping getter from StateService.students
  get payments(): PaymentItem[] {
    return this.stateService.students
      .filter((student) => this.isBeforeOrEqualMonth(student.joinDate, this.selectedDate))
      .map((student, idx) => {
        const courseName = student.course;
        const baseMonthlyPrice = this.getCoursePrice(courseName);
        
        // Extract plan name billing cycle frequency (e.g. "Monthly" from "Monthly ₹5000")
        const planName = student.payment.plan.split(' ')[0] || 'Monthly';
        
        // Calculate amount based on plan frequency and base monthly course price
        let amount = baseMonthlyPrice;
        if (planName === 'Quarterly') {
          amount = baseMonthlyPrice * 3;
        } else if (planName === 'Yearly') {
          amount = baseMonthlyPrice * 12;
        }

        // Extract the billing day from the student's admission (join) date
        const dueDay = this.extractDay(student.joinDate);
        const dueDate = `${dueDay} ${this.selectedDate}`;
        
        const invoiceId = `INV-${1024 + idx}`;
        const lastPaidDate = student.payment.lastPaid;
        
        // Seed details variables
        const paymentMethod = idx % 2 === 0 ? 'UPI' : (idx % 3 === 0 ? 'Credit Card' : 'Net Banking');
        
        let totalMonths = 6;
        if (planName === 'Yearly') {
          totalMonths = 12;
        } else if (planName === 'Quarterly') {
          totalMonths = 3;
        }

        // Get list of months starting from selectedDate going backwards
        const dateIndex = this.dates.indexOf(this.selectedDate);
        const months = dateIndex !== -1 ? this.dates.slice(dateIndex) : ['June 2026', 'May 2026', 'April 2026', 'March 2026', 'February 2026', 'January 2026'];

        // Count cleared historical months
        const clearedMonths = this.clearedHistoryMonths[student.id] || [];

        // Generate history log dynamically containing only billing cycle start months
        const history: PaymentHistoryItem[] = [];
        let count = 0;
        for (let i = 0; i < months.length; i++) {
          const monthName = months[i];
          if (this.isOnOrAfterMonth(monthName, student.joinDate)) {
            if (this.isBillingCycleStart(monthName, student.joinDate, planName)) {
              let monthStatus: 'Paid' | 'Pending' = 'Pending';
              if (this.isMonthPaid(monthName, lastPaidDate, planName, clearedMonths)) {
                monthStatus = 'Paid';
              }

              history.push({
                month: monthName,
                amount: amount,
                status: monthStatus
              });
              count++;
              if (count >= totalMonths) break;
            }
          }
        }

        // Calculate paid months from history count
        const paidMonths = history.filter(h => h.status === 'Paid').length;

        // Status of student for the selected month is the paid status of the selectedDate month
        const isCurrentMonthPaid = this.isMonthPaid(this.selectedDate, lastPaidDate, planName, clearedMonths);
        const status: 'Paid' | 'Pending' = isCurrentMonthPaid ? 'Paid' : 'Pending';

        // 1. Calculate dynamic Last Paid Date for selectedDate
        let displayLastPaidDate = 'N/A';
        for (const mName of this.dates) {
          if (this.isBeforeOrEqualMonth(mName, this.selectedDate) && this.isOnOrAfterMonth(mName, student.joinDate)) {
            if (this.isBillingCycleStart(mName, student.joinDate, planName)) {
              const isPaid = this.isMonthPaid(mName, lastPaidDate, planName, clearedMonths);
              if (isPaid) {
                const globalLastPaidParsed = this.parseMonthYear(lastPaidDate);
                const mNameParsed = this.parseMonthYear(mName);
                if (globalLastPaidParsed && mNameParsed && globalLastPaidParsed.year === mNameParsed.year && globalLastPaidParsed.month === mNameParsed.month) {
                  displayLastPaidDate = lastPaidDate;
                } else {
                  displayLastPaidDate = `${dueDay} ${mName}`;
                }
                break;
              }
            }
          }
        }

        // 2. Calculate dynamic Next Due Date for selectedDate (searching from join date forward)
        let displayNextDueDate = '';
        const ascendingDates = [...this.dates].reverse();
        let foundUnpaid = false;
        
        for (const mName of ascendingDates) {
          if (this.isOnOrAfterMonth(mName, student.joinDate)) {
            if (this.isBillingCycleStart(mName, student.joinDate, planName)) {
              const isPaid = this.isMonthPaid(mName, lastPaidDate, planName, clearedMonths);
              if (!isPaid) {
                displayNextDueDate = `${dueDay} ${mName}`;
                foundUnpaid = true;
                break;
              }
            }
          }
        }
        
        if (!foundUnpaid) {
          const lastPaidParsed = this.parseMonthYear(lastPaidDate);
          if (lastPaidParsed) {
            let planDuration = 1;
            if (planName === 'Quarterly') {
              planDuration = 3;
            } else if (planName === 'Yearly') {
              planDuration = 12;
            }
            let nextM = lastPaidParsed.month + planDuration;
            let nextY = lastPaidParsed.year;
            if (nextM > 11) {
              nextY += Math.floor(nextM / 12);
              nextM = nextM % 12;
            }
            const monthNames = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            displayNextDueDate = `${dueDay} ${monthNames[nextM]} ${nextY}`;
          } else {
            displayNextDueDate = `${dueDay} ${this.getNextMonth(this.selectedDate)}`;
          }
        }

        return {
          id: `PAY_${student.id}`,
          studentName: student.name,
          email: student.email,
          contact: student.contact,
          courseName: courseName,
          planName: planName,
          amount: amount,
          dueDate: dueDate,
          status: status,
          avatarColor: student.avatarColor,
          lastPaidDate: displayLastPaidDate,
          nextDueDate: displayNextDueDate,
          paymentMethod: paymentMethod,
          invoiceId: invoiceId,
          paidMonths: paidMonths,
          totalMonths: totalMonths,
          history: history
        };
      });
  }

  // Get reactive payment details object for the selected ID
  get selectedPayment(): PaymentItem | null {
    if (!this.selectedPaymentId) return null;
    return this.payments.find(p => p.id === this.selectedPaymentId) || null;
  }

  // Getters for Stats
  get totalRevenue(): number {
    return this.paidAmount + this.pendingAmount;
  }

  get paidAmount(): number {
    return this.payments
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  get pendingAmount(): number {
    return this.payments
      .filter((p) => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  get filteredPayments(): PaymentItem[] {
    return this.payments.filter((payment) => {
      const term = this.searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        payment.studentName.toLowerCase().includes(term) ||
        payment.email.toLowerCase().includes(term);

      const matchesStatus =
        this.selectedStatus === 'All' || payment.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  // Check if student has ANY pending or overdue payment in overall status or history log
  get hasPendingPayments(): boolean {
    if (!this.selectedPayment) return false;
    return this.selectedPayment.status !== 'Paid' || 
           this.selectedPayment.history.some(h => h.status !== 'Paid');
  }

  viewInfo(payment: PaymentItem) {
    this.selectedPaymentId = payment.id;
  }

  closeInfo() {
    this.selectedPaymentId = null;
  }

  markAsPaid(payment: PaymentItem) {
    const studentId = payment.id.replace('PAY_', '');
    
    // 1. Identify first pending/overdue month in history log and clear it locally
    const pendingHistory = payment.history.filter(h => h.status !== 'Paid');
    let clearedMonth = 'June 2026';
    
    if (pendingHistory.length > 0) {
      const oldestPending = [...pendingHistory].reverse()[0];
      clearedMonth = oldestPending.month;
      
      // Save cleared month in tracking map
      if (!this.clearedHistoryMonths[studentId]) {
        this.clearedHistoryMonths[studentId] = [];
      }
      this.clearedHistoryMonths[studentId].push(clearedMonth);
    }

    // 2. If the overall status is not Paid, mark it as Paid in StateService
    const student = this.stateService.students.find((s) => s.id === studentId);
    if (student) {
      if (student.payment.status !== 'Paid') {
        student.payment.status = 'Paid';
      }
      // Set lastPaid dynamically matching the due date's day of billing
      const dayMatch = payment.dueDate.match(/^\d+/);
      const day = dayMatch ? dayMatch[0] : '10';
      student.payment.lastPaid = `${day} ${clearedMonth}`;
      
      // Record activity in the student timeline log
      student.activities.unshift({
        text: `Paid course fee of ₹${payment.amount} for ${clearedMonth}`
      });
    }
    
    this.triggerToast(`Payment marked as Paid for ${payment.studentName} (${clearedMonth})`);
  }

  sendReminder(payment: PaymentItem) {
    this.triggerToast(`Reminder sent successfully to ${payment.studentName}`);
  }


  private triggerToast(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
