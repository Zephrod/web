import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth().subscribe();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/login', credentials, {
      withCredentials: true
    }).pipe(
      tap(() => this.checkAuth())
    );
  }

  checkAuth(): Observable<boolean> {
    return this.http.get('http://localhost:3000/me', {
      withCredentials: true
    }).pipe(
      tap(user => this.currentUser.next(user)),
      map(() => true),
      catchError(() => {
        this.currentUser.next(null);
        return of(false);
      })
    );
  }
  logout() {
    return this.http.post('http://localhost:3000/logout', {}, {
      withCredentials: true
    }).pipe(
      tap(() => this.currentUser.next(null))
    );
  }
}