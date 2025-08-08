import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CarbonFootprint } from '../carbon-footprint/carbon-footprint';

@Component({
  selector: 'app-summary',
  imports: [Header, Footer, CarbonFootprint],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {

}
