export interface Voyage {
  distanceKm: number;
  consommationPour100Km: number;
  quantiteCO2: number;
  date: Date;
  typeVoyage: string;
  typeCarburant: string | undefined;
}
