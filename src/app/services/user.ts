import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private username: string = '';

  async login(username: string) {
    this.username = username;
    console.log(this.username);
  }

  async getUsername() {
    return this.username;
  }
}
