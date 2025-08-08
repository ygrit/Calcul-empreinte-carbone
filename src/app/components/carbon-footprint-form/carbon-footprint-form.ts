import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute-service';
import { Voyage } from '../../models/voyage';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [FormsModule, ReactiveFormsModule, TitleCasePipe, MatButtonModule],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.scss'
})
export class CarbonFootprintForm {
  form: FormGroup = new FormGroup({
    typeVoyage: new FormControl('voiture', Validators.required),
    distanceKm: new FormControl(0, [Validators.required, Validators.min(1)]),
    consommationPour100Km: new FormControl(1, [Validators.min(1)]), // seulement pour voiture
    typeCarburant: new FormControl(''), // nouveau champ
    dateVoyage: new FormControl(new Date(Date.now()), Validators.required)
  });

  listTypesVoyage: string[] = ['voiture', 'train', 'avion'];
  listCarburantsVoiture: string[] = ['diesel', 'essence'];
  listCarburantsTrain: string[] = ['electricite', 'diesel'];

  private carbonFootPrintComputeSrv = inject(CarbonFootprintComputeService);

  async validateForm() {
    if (this.form.valid) {
      const voyage: Voyage = {
        distanceKm: this.form.value.distanceKm,
        consommationPour100Km: this.form.value.consommationPour100Km,
        date: this.form.value.dateVoyage,
        typeVoyage: this.form.value.typeVoyage,
        typeCarburant: this.form.value.typeCarburant
      };

      try {
        const res = await this.carbonFootPrintComputeSrv
          .calculerTrajet(voyage)
          .toPromise();

        voyage.quantiteCO2 = res.empreinteCarbone;
        console.log('Empreinte carbone calculée :', voyage.quantiteCO2);

        // On l’enregistre via addVoyage
        await this.carbonFootPrintComputeSrv.addVoyage(voyage);
      } catch (err) {
        console.error("Erreur lors du calcul de l'empreinte carbone", err);
      }
    }
  }
}
