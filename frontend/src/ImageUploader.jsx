import { useState, useRef } from 'react'
import axios from 'axios'

const S = {
  page: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '64px 32px 40px', textAlign: 'center'
  },
  heading: { fontSize: '36px', fontWeight: 600, color: 'var(--text-h)', margin: '0 0 12px', letterSpacing: '-0.5px' },
  subheading: { color: 'var(--text)', fontSize: '16px', margin: '0 0 40px' },
  dropZone: {
    width: '100%', maxWidth: '480px', height: '260px',
    border: '2px dashed var(--border)', borderRadius: '16px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', background: 'var(--code-bg)', transition: 'border-color 0.2s', marginBottom: '24px'
  },
  dropZoneHover: {
    borderColor: 'var(--accent)'
  },
  dropIcon: { fontSize: '40px', marginBottom: '12px' },
  dropText: { color: 'var(--text)', fontSize: '15px' },
  previewGrid: {
    display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', padding: '16px'
  },
  previewImg: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
  analyzeBtn: {
    padding: '13px 40px', background: 'var(--accent)', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer',
    fontWeight: 500, fontFamily: 'var(--sans)'
  },
  analyzeBtnDisabled: {
    opacity: 0.5, cursor: 'not-allowed'
  }
}

export default function ImageUploader({ setScanId, setResult, onScanComplete }) {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [hovering, setHovering] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelection = (files) => {
    for (const file of files) {
      if (file && file.type.startsWith('image/')) {
        setImages(prev => [...prev, file])
        const reader = new FileReader()
        reader.onloadend = () => setPreviews(prev => [...prev, reader.result])
        reader.readAsDataURL(file)
      } else {
        alert('Please select a valid image file.')
      }
    }
  }

  const handleDragOver = (e) => { e.preventDefault(); setHovering(true) }
  const handleDragLeave = () => setHovering(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setHovering(false)
    handleFileSelection(Array.from(e.dataTransfer.files))
  }

  const handleSubmit = async () => {
    if (images.length === 0) { alert('Please select an image first.'); return }
    setLoading(true)
    const formData = new FormData()
    images.forEach(img => formData.append('files', img))
    try {
      const response = await axios.post('http://localhost:8000/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setScanId(response.data.id)
      setResult({ ...response.data, previewUrl: previews[0] })
      onScanComplete()
    } catch (err) {
      console.error('Error scanning image:', err)
      alert('Failed to scan image.')
    } finally {
      setLoading(false)
    }
  }

  const dropStyle = hovering
    ? { ...S.dropZone, borderColor: 'var(--accent)' }
    : S.dropZone

  return (
    <div style={S.page}>
      <h1 style={S.heading}>Unlock New Liberties</h1>
      <p style={S.subheading}>Drop a photo of any toy and let AI do the rest</p>

      <div
        style={dropStyle}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {previews.length > 0 ? (
          <div style={S.previewGrid}>
            {previews.map((src, i) => (
              <img key={i} src={src} alt={`Preview ${i}`} style={S.previewImg} />
            ))}
          </div>
        ) : (
          <>
            <div style={S.dropIcon}>📷</div>
            <p style={S.dropText}>Drag & drop images here, or click to browse</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={e => handleFileSelection(Array.from(e.target.files))}
        />
      </div>

      <button
        style={loading ? { ...S.analyzeBtn, ...S.analyzeBtnDisabled } : S.analyzeBtn}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Analyze'}
      </button>
    </div>
  )
}
