import { Injectable } from '@angular/core';
import { Voyage } from '../models/voyage';
import { ResumeVoyages } from '../models/resume-voyages';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {
  private listVoyages: Voyage[] = [
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 0, date: new Date(Date.now()), typeVoyage: 'voiture', typeCarburant: 'diesel' },
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 0, date: new Date(Date.now()), typeVoyage: 'voiture', typeCarburant: 'diesel' },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 0, date: new Date(Date.now()), typeVoyage: 'voiture', typeCarburant: 'diesel' },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 0, date: new Date(Date.now()), typeVoyage: 'voiture', typeCarburant: 'diesel' },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 0, date: new Date(Date.now()), typeVoyage: 'voiture', typeCarburant: 'diesel' }
  ];

  constructor() {
    this.listVoyages.forEach((value) => {
      value.quantiteCO2 = (value.distanceKm * value.consommationPour100Km) / 100 * 2.3;
    });
  }

  async getVoyages(): Promise<Voyage[]> {
    return this.listVoyages;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.listVoyages);
    //   }, 3000);
    // });
  }

  async addVoyage(voyage: Voyage) {
    this.listVoyages.push(voyage);
  }

  async getResumeVoyages(): Promise<ResumeVoyages> {
    let distanceTotaleKm = 0;
    let consommationTotalePour100Km = 0;
    let quantiteTotaleCO2 = 0;

    for (let voyage of this.listVoyages) {
      distanceTotaleKm += voyage.distanceKm;
      consommationTotalePour100Km += voyage.consommationPour100Km;
      quantiteTotaleCO2 += voyage.quantiteCO2;
    }
    return { distanceTotaleKm, consommationTotalePour100Km, quantiteTotaleCO2 };
  }
}
