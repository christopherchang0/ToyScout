import { useEffect, useState } from 'react'

export default function ScanHistory() {
  const [scans, setScans] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/scans')
      .then(res => res.json())
      .then(data => setScans(data))
      .catch(err => console.error('Error fetching scans:', err))
  }, [])

  return (
    <div>
      <h2>Scan History</h2>
      {scans.map(scan => (
        <div key={scan.id}>
          <h3>{scan.name}</h3>
          <p>Brand: {scan.brand}</p>
          <p>Scanned: {scan.created_at}</p>
        </div>
      ))}
    </div>
  )
}
