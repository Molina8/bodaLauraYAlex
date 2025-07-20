export interface Guest {
  id: string;
  name: string;
  lastName: string;
  dietaryRestrictions: string;
}

export interface FormData {
  name: string;
  lastName: string;
  willAttend: boolean;
  dietaryRestrictions: string;
  hasCompanion: boolean;
  companion?: Guest;
  numberOfChildren: number;
  busService: 'none' | 'roundtrip' | 'oneway-there' | 'oneway-back';
  songSuggestion: string;
}
