import { useEffect, useState } from 'react'

const S = {
  section: { width: '100%', maxWidth: '560px', textAlign: 'left', padding: '0 32px' },
  heading: { margin: '0 0 16px', color: 'var(--text-h)', fontSize: '18px', fontWeight: 500 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  card: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px'
  },
  thumbnail: {
    width: '100%', height: '80px', background: 'var(--border)',
    borderRadius: '8px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '28px', marginBottom: '8px'
  },
  cardName: { fontSize: '14px', fontWeight: 600, color: 'var(--text-h)', margin: 0 },
  cardBrand: { fontSize: '12px', color: 'var(--text)', margin: 0 },
  cardPrice: { fontSize: '13px', color: 'var(--accent)', margin: 0, fontWeight: 500 }
}

export default function RecentScans({ refreshKey }) {
  const [scans, setScans] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/scans')
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setScans(sorted.slice(0, 4))
      })
      .catch(err => console.error(err))
  }, [refreshKey])

  if (scans.length === 0) return null

  return (
    <div style={S.section}>
      <h3 style={S.heading}>Recent Scans</h3>
      <div style={S.grid}>
        {scans.map(scan => (
          <div key={scan.id} style={S.card}>
            {scan.image_url
              ? <img src={scan.image_url} alt={scan.name} style={{...S.thumbnail, objectFit: 'cover'}} />
              : <div style={S.thumbnail}>🧸</div>
            }
            <p style={S.cardName}>{scan.name}</p>
            <p style={S.cardBrand}>{scan.brand}</p>
            <p style={S.cardPrice}>{scan.estimated_value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
