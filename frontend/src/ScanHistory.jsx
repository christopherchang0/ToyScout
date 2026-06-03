import { useEffect, useState } from 'react'

export default function ScanHistory() {
  const [scans, setScans] = useState([])
  const [sortOrder, setSortOrder] = useState('newest')

  useEffect(() => {
    fetch('http://localhost:8000/scans')
      .then(res => res.json())
      .then(data => setScans(data))
      .catch(err => console.error('Error fetching scans:', err))
  }, [])

  const sorted = [...scans].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.created_at) - new Date(a.created_at)
    return new Date(a.created_at) - new Date(b.created_at)
  })

  return (
    <div>
      <h2>Scan History</h2>
      <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
      {sorted.map(scan => (
        <div key={scan.id}>
          <h3>{scan.name}</h3>
          <p>Brand: {scan.brand}</p>
          <p>Scanned: {scan.created_at}</p>
        </div>
      ))}
    </div>
  )
}
