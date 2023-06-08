import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;  // Subject to store the JWT token
  public token: Observable<string | null>;  // Observable to watch the JWT token

  private userIdSubject: BehaviorSubject<number | null>;  // Subject to store the user ID
  public userId: Observable<number | null>;  // Observable to watch the user ID

  constructor() {
    this.tokenSubject = new BehaviorSubject<string | null>(null);  // Initialize the token subject
    this.token = this.tokenSubject.asObservable();  // Initialize the token observable
    this.userIdSubject = new BehaviorSubject<number | null>(null);  // Initialize the user ID subject
    this.userId = this.userIdSubject.asObservable();  // Initialize the user ID observable
  }

  login(token: string, userId: number): void {
    localStorage.setItem('userToken', token);  // Save the token to local storage
    this.tokenSubject.next(token);  // Update the token subject
    localStorage.setItem('userId', userId.toString());  // Save the user ID to local storage
    this.userIdSubject.next(userId);  // Update the user ID subject
  }

  logout(): void {
    localStorage.removeItem('userToken');  // Remove the token from local storage
    this.tokenSubject.next(null);  // Update the token subject
    localStorage.removeItem('userId');  // Remove the user ID from local storage
    this.userIdSubject.next(null);  // Update the user ID subject
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('userToken');  // Get the token from local storage
    return !!token;  // Return true if the token exists, false otherwise
  }

  public getToken(): string {
    const token = localStorage.getItem('userToken');  // Get the token from local storage
    if (token === null) {
        throw new Error('No token found');  // If no token was found, throw an error
    }
    return token;  // Return the token
  }

  public get currentToken(): string | null {
    return this.tokenSubject.value;  // Get the current value of the token subject
  }

  public get currentUserId(): number | null {
    const userId = localStorage.getItem('userId');  // Get the user ID from local storage
    return userId ? parseInt(userId) : null;  // Parse it to an integer and return it, or return null if it doesn't exist
  }
}
