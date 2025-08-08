export interface Voyage {
  distanceKm: number;
  consommationPour100Km?: number; // optionnel (pas pour avion)
  quantiteCO2?: number;
  date: Date;
  typeVoyage: string;
  typeCarburant: string; // nouveau champ
}
