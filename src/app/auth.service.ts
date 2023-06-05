import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIdSubject: BehaviorSubject<number | null>;
  public userId: Observable<number | null>;

  constructor() {
    this.userIdSubject = new BehaviorSubject<number | null>(null);
    this.userId = this.userIdSubject.asObservable();
  }

  login(userId: number): void {
    this.userIdSubject.next(userId);
  }

  logout(): void {
    this.userIdSubject.next(null);
  }
}
