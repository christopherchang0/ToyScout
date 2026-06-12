import { useEffect, useState } from 'react'

const S = {
  page: { padding: '48px 32px' },
  heading: { margin: '0 0 24px', color: 'var(--text-h)', fontSize: '28px', fontWeight: 600, textAlign: 'left' },
  sortRow: { display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' },
  select: {
    padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '8px',
    fontSize: '14px', background: 'var(--bg)', color: 'var(--text-h)', fontFamily: 'var(--sans)', cursor: 'pointer'
  },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    display: 'flex', gap: '16px', alignItems: 'center',
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '16px'
  },
  thumbnail: {
    width: '60px', height: '60px', borderRadius: '10px', background: 'var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '26px', flexShrink: 0
  },
  cardBody: { textAlign: 'left', flex: 1 },
  cardName: { margin: '0 0 4px', color: 'var(--text-h)', fontSize: '16px', fontWeight: 600 },
  cardMeta: { margin: '0 0 2px', color: 'var(--text)', fontSize: '13px' },
  cardDesc: { margin: '4px 0 0', color: 'var(--text)', fontSize: '13px', lineHeight: '1.4' },
  cardPrice: { margin: '4px 0 0', color: 'var(--accent)', fontSize: '14px', fontWeight: 500 },
  empty: { color: 'var(--text)', textAlign: 'center', padding: '40px' }
}

export default function ScanHistory() {
  const [scans, setScans] = useState([])
  const [sortOrder, setSortOrder] = useState('newest')

  useEffect(() => {
    fetch('http://localhost:8000/scans')
      .then(res => res.json())
      .then(data => setScans(data))
      .catch(err => console.error('Error fetching scans:', err))
  }, [])

  const sorted = [...scans].sort((a, b) =>
    sortOrder === 'newest'
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  )

  return (
    <div style={S.page}>
      <h2 style={S.heading}>Past Scans</h2>
      <div style={S.sortRow}>
        <select style={S.select} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      {sorted.length === 0 ? (
        <p style={S.empty}>No scans yet. Head to Discover to get started.</p>
      ) : (
        <div style={S.list}>
          {sorted.map(scan => (
            <div key={scan.id} style={S.card}>
              <div style={S.thumbnail}>🧸</div>
              <div style={S.cardBody}>
                <p style={S.cardName}>{scan.name}</p>
                <p style={S.cardMeta}>{scan.brand} · {scan.year} · {scan.condition}{scan.series ? ` · ${scan.series}` : ''}</p>
                {scan.description && <p style={S.cardDesc}>{scan.description}</p>}
                <p style={S.cardPrice}>{scan.estimated_value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
