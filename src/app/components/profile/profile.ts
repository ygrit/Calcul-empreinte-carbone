import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarbonFootprintComputeService } from '../../services/carbon-footprint-compute-service';


@Component({
  selector: 'app-profile',
  imports: [CarbonFootprintComputeService, ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  nomUtilisateur: string = '';
  distanceTotaleKm = 0;
  consommationTotalePour100Km = 0;
  quantiteTotaleCO2 = 0;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.nomUtilisateur = this.activatedRoute.snapshot.params['nom'];
  }



}
