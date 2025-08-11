import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink, MatButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  nomUtilisateur: string = '';
  idUtilisateur: number = 1;
  empreinteCarbone: number = 0;
  empreinteCarboneARetirer: number = 0;
  requestState: WritableSignal<string> = signal('');

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private apiSrv: ApiService = inject(ApiService);

  ngOnInit() {
    this.nomUtilisateur = this.activatedRoute.snapshot.params['nom'];
    this.getCarbonFootprint();
  }

  getCarbonFootprint() {
    this.apiSrv.getEmpreinteCarbone(this.idUtilisateur).subscribe({
      next: (value: any) => {
        this.empreinteCarbone = value.empreinteCarbone;
        this.requestState.set("L'empreinte carbone a bien été récupérée !");
      },
      error: (err) => this.requestState.set('Erreur : ' + err.message)
    });
  }

  reinitCarbonFootprint() {
    this.apiSrv.supprimerEmpreinteCarbone(this.idUtilisateur).subscribe({
      next: (value) => {
        this.requestState.set("L'empreinte carbone a bien été supprimée !");
        this.empreinteCarbone = 0;
      },
      error: (err) => this.requestState.set('Erreur : ' + err.message)
    });
  }

  removeCarbonFootprint() {
    if (this.empreinteCarboneARetirer > 0) {
      this.apiSrv.retirerEmpreinteCarbone(this.idUtilisateur, this.empreinteCarboneARetirer).subscribe({
        next: (value) => {
          this.requestState.set("L'empreinte carbone a bien été retirée !");
          this.empreinteCarbone = 0;
          this.getCarbonFootprint();
        },
        error: (err) => this.requestState.set('Erreur : ' + err.message)
      });
    } else {
      this.requestState.set("Erreur : l'empreinte carbone doit être supérieure à 0 !");
    }
  }
}
