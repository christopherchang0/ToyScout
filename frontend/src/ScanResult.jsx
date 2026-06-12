const S = {
  page: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '40px 32px', textAlign: 'center'
  },
  card: {
    width: '100%', maxWidth: '480px', background: 'var(--code-bg)',
    borderRadius: '16px', border: '1px solid var(--border)', padding: '24px',
    marginBottom: '32px'
  },
  previewImg: {
    width: '120px', height: '120px', objectFit: 'cover',
    borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px'
  },
  placeholder: {
    width: '120px', height: '120px', borderRadius: '12px',
    background: 'var(--border)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px'
  },
  name: { margin: '0 0 6px', color: 'var(--text-h)', fontSize: '22px', fontWeight: 600 },
  meta: { margin: '0 0 4px', color: 'var(--text)', fontSize: '14px' },
  price: { margin: '12px 0 0', color: 'var(--accent)', fontSize: '18px', fontWeight: 600 },
  desc: { margin: '8px 0 0', color: 'var(--text)', fontSize: '14px', lineHeight: '1.5' },
  scanAgainBtn: {
    padding: '11px 28px', background: 'transparent', color: 'var(--text-h)',
    border: '1px solid var(--border)', borderRadius: '8px', fontSize: '15px',
    cursor: 'pointer', fontFamily: 'var(--sans)', fontWeight: 500
  }
}

export default function ScanResult({ result, onScanAgain }) {
  if (!result) return null

  return (
    <div style={S.page}>
      <div style={S.card}>
        {(result.image_url || result.previewUrl)
          ? <img src={result.image_url || result.previewUrl} alt="Scanned toy" style={S.previewImg} />
          : <div style={S.placeholder}>🧸</div>
        }
        <h2 style={S.name}>{result.name}</h2>
        <p style={S.meta}>{result.brand} · {result.year} · {result.condition}</p>
        <p style={S.desc}>{result.description}</p>
        <p style={S.price}>{result.estimated_value}</p>
      </div>
      <button style={S.scanAgainBtn} onClick={onScanAgain}>Scan again</button>
    </div>
  )
}
