import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from '../../services/auth.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-schedule',
  standalone:false,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['day', 'time', 'course', 'location', 'instructor'];
  schedule: any[] = [];

  constructor(
    public authService: AuthService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.loadSchedule();
    this.scheduleService.getSchedule().subscribe(console.log); // Temporary debug
  }

  loadSchedule() {
    this.authService.currentUser$.pipe(
      switchMap(user => {
        const userId = user?.id;
        return this.scheduleService.getSchedule().pipe(
          map(courses => courses.filter(course => 
            course.professor?._id === userId ||
            course.students?.includes(userId)
          ))
        );
      })
    ).subscribe({
      next: filteredCourses => this.schedule = filteredCourses,
      error: err => console.error('Error loading schedule:', err)
    });
  }
}