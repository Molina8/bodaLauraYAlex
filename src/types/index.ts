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
  guests: Guest[];
  busService: 'none' | 'roundtrip' | 'oneway-there' | 'oneway-back';
  songSuggestion: string;
}
