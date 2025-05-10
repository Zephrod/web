import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from '../../services/auth.service';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  standalone: false,
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
  }

  loadSchedule() {
    this.authService.currentUser$.pipe(
      filter(user => !!user?.id), // Ensure user data is available
      switchMap(user => {
        const userId = user.id;
        console.log('User ID:', userId); // Debug log
        return this.scheduleService.getSchedule().pipe(
          map(courses => {
            console.log('Raw courses:', courses);
            console.log('Filtering for user ID:', userId);
            return courses.filter(course => 
              course.professor === userId || 
              course.students?.includes(userId)
            );
          })
        );
      })
    ).subscribe({
      next: filtered => {
        console.log('Filtered courses:', filtered);
        this.schedule = filtered;
      },
      error: err => console.error('Error:', err)
    });
  }
}