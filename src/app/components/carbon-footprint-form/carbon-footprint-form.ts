import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute-service';
import { Voyage } from '../../models/voyage';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [FormsModule, ReactiveFormsModule, TitleCasePipe, MatButtonModule],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.scss'
})
export class CarbonFootprintForm {
  form: FormGroup = new FormGroup({
    typeVoyage: new FormControl("voiture", Validators.required),
    distanceKm: new FormControl(0, Validators.min(1)),
    consommationPour100Km: new FormControl(1, Validators.min(1)),
    dateVoyage: new FormControl(new Date(Date.now()), Validators.required),
    typeCarburant: new FormControl('diesel')
  });
  listTypesVoyage: string[] = ['voiture', 'train', 'avion'];
  @Output()
  addVoyageEvent = new EventEmitter();

  private carbonFootPrintComputeSrv: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);
  private ApiSrv: ApiService = inject(ApiService);

  async calcEmpreinteTrajet(): Promise<number> {
    let request;

    if (this.form.value.typeVoyage === 'voiture') {
      request = this.ApiSrv.calculerTrajetVoiture(this.form.value.consommationPour100Km, this.form.value.typeCarburant, this.form.value.distanceKm);
    } else if (this.form.value.typeVoyage === 'train') {
      request = this.ApiSrv.calculerTrajetTrain(this.form.value.distanceKm, this.form.value.typeCarburant);
    } else {
      request = this.ApiSrv.calculerTrajetAvion(this.form.value.distanceKm);
    }

    return new Promise((resolve, reject) => {
      request.subscribe({
        next: (value: any) => {
          if (value && value.empreinteCarbone)
            resolve(value.empreinteCarbone);    
        },
        error: (error) => reject(error)
      });
    });
  }

  async validateForm() {
    if (this.form?.valid) {
      // Création d'un nouveau voyage
      let newVoyage: Voyage = {
        distanceKm: this.form.value.distanceKm,
        consommationPour100Km: 0,
        quantiteCO2: 0,
        date: this.form.value.dateVoyage,
        typeVoyage: this.form.value.typeVoyage,
        typeCarburant: this.form.value.typeCarburant
      }

      // Calcul de l'empreinte carbone du voyage
      try {
        newVoyage.quantiteCO2 = await this.calcEmpreinteTrajet();
      } catch (error) {
        console.log(error);
      }

      // Gestion des cas particuliers des valeurs du voyage
      if (this.form.value.typeVoyage === 'voiture') {
        newVoyage.consommationPour100Km = this.form.value.consommationPour100Km;
      } else if (this.form.value.typeVoyage === 'avion') {
        newVoyage.typeCarburant = 'kerosene';
      }

      // Ajout du voyage au tableau du service
      await this.carbonFootPrintComputeSrv.addVoyage(newVoyage);
      this.addVoyageEvent.emit('ajout');
    }
  }
}
