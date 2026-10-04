"use client";

import { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE;

      if (dataSource === 'firestore') {
        try {
          // Firebase init
          const firebaseConfig = {
            projectId: "pj-ailab-sem06-65d6f",
            apiKey: "fake-api-key"
          };
          
          const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
          const db = getFirestore(app);

          if (process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
            // Emulador local
            connectFirestoreEmulator(db, window.location.hostname || "localhost", 8080);
          }

          const querySnapshot = await getDocs(collection(db, "items"));
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data().name || doc.data().texto || doc.id);
          });

          setData({ status: "ok", items: items });
        } catch (err) {
          console.error(err);
          setError("dados indisponíveis (Firestore)");
        }
      } else {
        // Fallback: API antiga (backend Node/Django)
        fetch('/api/health/')
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(data => setData(data))
          .catch(err => setError("dados indisponíveis"));
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Desafio Fase 3 - Frontend</h1>
      <h2>Status da API Backend:</h2>
      {error && <p style={{ color: 'red' }}>Erro ao conectar: {error}</p>}
      
      {data ? (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Status:</strong> {data.status}</p>
          <ul style={{ marginTop: '1rem', listStyleType: 'disc', paddingLeft: '2rem' }}>
            {data.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : !error ? (
        <p>Carregando...</p>
      ) : null}
    </div>
  );
}
