import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getSchedule() {
    return this.http.get<any[]>(this.apiUrl);
  }
}