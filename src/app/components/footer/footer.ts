import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  date: Date = new Date(Date.now());
  // date: number = formatDate(new Date(Date.now()), 'dd/MM/yyyy', 'fr');
}
