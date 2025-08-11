import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = 'http://127.0.0.1:8080';
  private urlTrajetVoiture: string = '/calculerTrajetVoiture';
  private urlTrajetTrain: string = '/calculerTrajetTrain';
  private urlTrajetAvion: string = '/calculerTrajetAvion';

  calculerTrajetVoiture(consommation: number, typeCarburant: string, distance: number) {
    return this.http.get(this.baseUrl + this.urlTrajetVoiture, { params: {
      consommationPour100Km: consommation,
      typeCarburant: typeCarburant,
      distanceKm: distance
    }});
  }

  calculerTrajetTrain(distance: number, typeCarburant: string) {
    return this.http.get(this.baseUrl + this.urlTrajetTrain, { params: {
      distanceKm: distance,
      typeCarburant: typeCarburant
    }});
  }

  calculerTrajetAvion(distance: number) {
    return this.http.get(this.baseUrl + this.urlTrajetAvion, { params: { distanceKm: distance } });
  }

  getEmpreinteCarbone(idUtilisateur: number) {
    return this.http.get(this.baseUrl + '/monEmpreinteCarbone', { params: { idUtilisateur: idUtilisateur } });
  }

  ajouterEmpreinteCarbone(idUtilisateur: number, empreinteCarbone: number) {
    const body = {
      idUtilisateur: idUtilisateur,
      empreinteCarbone: empreinteCarbone
    };
    return this.http.put(this.baseUrl + '/ajouterEmpreinteCarbone', body);
  }

  retirerEmpreinteCarbone(idUtilisateur: number, empreinteCarbone: number) {
    const body = {
      idUtilisateur: idUtilisateur,
      empreinteCarbone: empreinteCarbone
    };
    return this.http.put(this.baseUrl + '/retirerEmpreinteCarbone', body);
  }

  supprimerEmpreinteCarbone(idUtilisateur: number) {
    const body = {
      idUtilisateur: idUtilisateur,
    };
    console.log(idUtilisateur);
    return this.http.post(this.baseUrl + '/supprimerEmpreinteCarbone', body);
  }
}
