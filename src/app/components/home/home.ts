import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../services/user';

@Component({
  selector: 'app-home',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  login: string = '';
  password: string = '';
  errorMsg: any = {};

  private router: Router = inject(Router);
  private userSrv: User = inject(User);

  async navigate() {
    await this.userSrv.login('Jean');
    this.router.navigate(['/summary']);
  }

  async connection() {
    if (this.login.length < 3) {
      this.errorMsg['login'] = 'Le login doit faire au moins 3 caractères.';
    } else if (this.password.length < 6) {
      this.errorMsg['password'] = 'Le mot de passe doit faire au moins 6 caractères.';
    } else {
      await this.userSrv.login(this.login);
      this.router.navigate(['/profile', this.login]);
    }
  }
}
