import { collection, addDoc, Timestamp, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { FormData } from '../types';

// Interfaz para los datos que se guardarán en Firestore
export interface FirestoreFormData {
  // Campos obligatorios (siempre se guardan)
  name: string;
  lastName: string;
  willAttend: boolean;
  
  // Campos opcionales (nullable) - solo se guardan si willAttend es true
  dietaryRestrictions?: string | null;
  hasCompanion?: boolean | null;
  companionName?: string | null;
  companionLastName?: string | null;
  companionDietaryRestrictions?: string | null;
  numberOfChildren?: number | null;
  busService?: 'none' | 'roundtrip' | 'oneway-there' | 'oneway-back' | null;
  songSuggestion?: string | null;
  
  // Metadatos automáticos
  submittedAt: Timestamp;
  userAgent?: string;
}

/* 
Ejemplo de documento guardado en Firestore:

1. Si NO asiste:
{
  name: "Juan",
  lastName: "Pérez", 
  willAttend: false,
  submittedAt: Timestamp,
  userAgent: "Mozilla/5.0..."
}

2. Si SÍ asiste sin acompañante:
{
  name: "María",
  lastName: "García",
  willAttend: true,
  dietaryRestrictions: "Vegetariana",
  hasCompanion: false,
  numberOfChildren: 0,
  busService: "roundtrip",
  songSuggestion: "Tu canción favorita",
  submittedAt: Timestamp,
  userAgent: "Mozilla/5.0..."
}

3. Si SÍ asiste con acompañante:
{
  name: "Carlos",
  lastName: "López",
  willAttend: true,
  dietaryRestrictions: null,
  hasCompanion: true,
  companionName: "Ana",
  companionLastName: "Martín",
  companionDietaryRestrictions: "Sin gluten",
  numberOfChildren: 2,
  busService: "oneway-there",
  songSuggestion: "Música romántica",
  submittedAt: Timestamp,
  userAgent: "Mozilla/5.0..."
}
*/

// Función para convertir FormData a FirestoreFormData
const prepareDataForFirestore = (formData: FormData): FirestoreFormData => {
  const baseData: FirestoreFormData = {
    name: formData.name,
    lastName: formData.lastName,
    willAttend: formData.willAttend,
    submittedAt: Timestamp.now(),
    userAgent: navigator.userAgent
  };

  // Solo agregar campos adicionales si la persona asistirá
  if (formData.willAttend) {
    baseData.dietaryRestrictions = formData.dietaryRestrictions || null;
    baseData.hasCompanion = formData.hasCompanion;
    baseData.numberOfChildren = formData.numberOfChildren;
    baseData.busService = formData.busService;
    baseData.songSuggestion = formData.songSuggestion || null;

    // Datos del acompañante si existe
    if (formData.hasCompanion && formData.companion) {
      baseData.companionName = formData.companion.name || null;
      baseData.companionLastName = formData.companion.lastName || null;
      baseData.companionDietaryRestrictions = formData.companion.dietaryRestrictions || null;
    }
  }

  return baseData;
};

// Función principal para guardar los datos del formulario
export const saveRSVPData = async (formData: FormData): Promise<string> => {
  try {
    const firestoreData = prepareDataForFirestore(formData);
    
    // Guardar en la colección 'rsvps'
    const docRef = await addDoc(collection(db, 'rsvps'), firestoreData);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al guardar RSVP:', error);
    throw new Error('No se pudo guardar la confirmación. Por favor, inténtalo de nuevo.');
  }
};

// Función auxiliar para validar datos antes de enviar
export const validateFormData = (formData: FormData): string[] => {
  const errors: string[] = [];

  if (!formData.name.trim()) {
    errors.push('El nombre es obligatorio');
  }

  if (!formData.lastName.trim()) {
    errors.push('El apellido es obligatorio');
  }

  // Si asiste y tiene acompañante, validar datos del acompañante
  if (formData.willAttend && formData.hasCompanion && formData.companion) {
    if (!formData.companion.name.trim()) {
      errors.push('El nombre del acompañante es obligatorio');
    }
    if (!formData.companion.lastName.trim()) {
      errors.push('El apellido del acompañante es obligatorio');
    }
  }

  return errors;
};

// Función para obtener todos los RSVPs (solo para admin)
export const getRSVPData = async (): Promise<(FirestoreFormData & { id: string })[]> => {
  try {
    const q = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const rsvps: (FirestoreFormData & { id: string })[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FirestoreFormData;
      rsvps.push({
        id: doc.id,
        ...data
      });
    });
    
    return rsvps;
  } catch (error) {
    console.error('❌ Error al obtener RSVPs:', error);
    throw new Error('No se pudieron cargar los datos de confirmaciones.');
  }
};
