import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  key = "user";

  constructor() { }

  public loginUserId(data: string): void {
    localStorage.setItem(this.key, data);
  }

  public hasUserId(): boolean {
    return !!localStorage.getItem(this.key);
  }

  public getUserId(): string {
    return localStorage.getItem(this.key)!;
  }

  public logoutUser(): void {
    localStorage.removeItem(this.key);
  }
}
