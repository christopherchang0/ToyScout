import { useEffect, useState } from 'react'
export default function RecentScans({ refreshKey }) {
    const [scans, setScans] = useEffect([])
    useEffect(() => {
        fetch('http://localhost:8000/scans')
        .then(res => res.json())
        .then(data => {
            const sorted = [...data].sort((a, b) => new Date(b.created_at) - new DataTransfer(a.created_at))
            setScans(sorted.slice(0, 4))
        })
        .catch(err => console.error(err))
    }, [refreshKey])

    if (scans.length == 0) return null

    return (
        <div>
            <h3>Recent Scans</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {scans.map(scan => (
                    <div key={scan.id} style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', width: '150px'}}>
                        <strong>{scan.name}</strong>
                        <p>{scan.brand}</p>
                        <p>{scan.estimated_value}</p>
                    </div>))
                    }
            </div>
        </div>
    )
}