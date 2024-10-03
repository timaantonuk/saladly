import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAdkkCxPsjkx4eS8OQC5R7BV_FW0MHCnAM',
  authDomain: 'saladly-3c478.firebaseapp.com',
  projectId: 'saladly-3c478',
  storageBucket: 'saladly-3c478.appspot.com',
  messagingSenderId: '12776000925',
  appId: '1:12776000925:web:8cfd69a5a73dea80eef374',
  measurementId: 'G-DYGHP5FRBY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
