export const dynamic = 'force-dynamic';

export default async function Home() {
  let data = null;
  let error = null;

  try {
    const res = await fetch('http://backend:8000/api/health/', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    data = await res.json();
  } catch (err) {
    error = err.message;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Desafio Fase 3 - Frontend</h1>
      <h2>Status da API Backend:</h2>
      {error && <p style={{ color: 'red' }}>Erro ao conectar: {error}</p>}
      
      {data && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Status:</strong> {data.status}</p>
          <ul style={{ marginTop: '1rem', listStyleType: 'disc', paddingLeft: '2rem' }}>
            {data.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
