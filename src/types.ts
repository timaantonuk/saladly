import { FirebaseError } from 'firebase/app';

export interface CustomFirebaseError extends FirebaseError {
  customData?: {
    email?: string;
  };
}

export interface IUserState {
  name: string;
  email: string;
  avatar: string;
}

export interface ICartItem {
  name: string;
  price: number;
  portion: string;
  imageUrl: string;
  quantity: number;
}

export type Salad = {
  price: number;
  priceXl: number;
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
