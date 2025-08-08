import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CarbonFootprintForm } from '../carbon-footprint-form/carbon-footprint-form';
import { CarbonFootprintResult } from '../carbon-footprint-result/carbon-footprint-result';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute-service';
import { Voyage } from '../../models/voyage';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintForm, CarbonFootprintResult, CommonModule, MatButtonModule],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.scss'
})
export class CarbonFootprint {
  distanceKm: WritableSignal<number> = signal(0);
  consommationPour100Km: WritableSignal<number> = signal(0);
  voyages: WritableSignal<Voyage[]> = signal([]);
  quantiteTotaleCO2: WritableSignal<number> = signal(0);

  // Injection du service dans le composant
  private carbonFootprintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  async ngOnInit() {
    try {
      this.voyages.set(await this.carbonFootprintComputeSrv.getVoyages());
      this.actualiserDataVoyages();
    } catch (error) {
      console.log(error);
    }
  }

  ajouter100km() {
    this.distanceKm.update(value => value + 100);
  }

  async genererVoyage() {
    const distance = Math.ceil(Math.random() * 500);
    const consommation = Math.ceil(Math.random() * 10);
    const quantite = (distance * consommation) / 100 * 2.3;
    this.carbonFootprintComputeSrv.addVoyage({ distanceKm: distance, consommationPour100Km: consommation, quantiteCO2: quantite, date: new Date(Date.now()), typeVoyage: 'voiture' });
    try {
      this.voyages.set(await this.carbonFootprintComputeSrv.getVoyages());
      this.actualiserDataVoyages();
    } catch (error) {
      console.log(error);
    }
  }

  async actualiserDataVoyages() {
    try {
      const result = await this.carbonFootprintComputeSrv.getResumeVoyages();
      this.distanceKm.set(result.distanceTotaleKm);
      this.consommationPour100Km.set(result.consommationTotalePour100Km / this.voyages().length);
      this.quantiteTotaleCO2.set(result.quantiteTotaleCO2);
    } catch (error) {
      console.log(error);
    }
  }
}
