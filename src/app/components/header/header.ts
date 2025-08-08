import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  // Création d'un signal
  nomUtilisateur: WritableSignal<string> = signal('');

  private userSrv: User = inject(User);

  async ngOnInit() {
    try {
      // On attribue une nouvelle valeur au signal
      this.nomUtilisateur.set(await this.userSrv.getUsername());
    } catch (error) {
      console.log(error);
    }
  }
}
