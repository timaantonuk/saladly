import { FirebaseError } from 'firebase/app';

export interface CustomFirebaseError extends FirebaseError {
  customData?: {
    email?: string;
  };
}

export type Salad = {
  price: number;
  description: string;
  carbs: number;
  protein: number;
  calories: number;
  popularity: number;
  fat: number;
  weight: number;
  name: string;
  filters: string[];
  imageUrl: string;
};
