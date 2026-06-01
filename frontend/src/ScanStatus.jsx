import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function LiveStatus({ scanId }) {
  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    const dbRef = ref(db, `scans/${scanId}`)
    
    const unsubscribe = onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            setStatus(snapshot.val().status)
        }
    }, (error) => {
        console.error("Error fetching live status:", error);
    });

    return () => unsubscribe();
  }, [scanId]);

  return (
    <div>
      <h3>Live Status: <span>{status}</span></h3>
    </div>
  );
}
