import { FirebaseError } from 'firebase/app';

export interface CustomFirebaseError extends FirebaseError {
  customData?: {
    email?: string;
  };
}
