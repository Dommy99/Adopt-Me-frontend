import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  private userIdSubject: BehaviorSubject<number | null>;
  public userId: Observable<number | null>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.token = this.tokenSubject.asObservable();
    this.userIdSubject = new BehaviorSubject<number | null>(null);
    this.userId = this.userIdSubject.asObservable();
  }

  login(token: string, userId: number): void {
    localStorage.setItem('userToken', token);
    this.tokenSubject.next(token);
    localStorage.setItem('userId', userId.toString());
    this.userIdSubject.next(userId);
}


  logout(): void {
    localStorage.removeItem('userToken');
    this.tokenSubject.next(null);
    localStorage.removeItem('userId');
    this.userIdSubject.next(null);
  }

  public get currentToken(): string | null {
    return this.tokenSubject.value;
  }

  public get currentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  }
}

