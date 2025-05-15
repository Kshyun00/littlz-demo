import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase 구성
const firebaseConfig = {
  apiKey: "AIzaSyCikEycZ31-tMPPfPMwgTSytnpbNwksd0g",
  authDomain: "littlz-academy.firebaseapp.com",
  projectId: "littlz-academy",
  storageBucket: "littlz-academy.firebasestorage.app",
  messagingSenderId: "288426102846",
  appId: "1:288426102846:web:e96385ac0ab13d3f78816f",
  measurementId: "G-4N3RKTXBHP"
};

// Firebase 초기화
console.log('Firebase 초기화 시작...', { projectId: firebaseConfig.projectId });
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
console.log('Firebase 초기화 성공!');

export { auth, db, analytics }; 