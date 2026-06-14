import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Landing from './Landing'
import Login from './Login'
import ImageUploader from './ImageUploader'
import ScanResult from './ScanResult'
import ScanStatus from './ScanStatus'
import ScanHistory from './ScanHistory'
import RecentScans from './RecentScans'

function useTheme() {
  const [dark, setDark] = useState(false)
  const toggle = () => setDark(d => {
    const next = !d
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    return next
  })
  return [dark, toggle]
}

const navS = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px'
  },
  logo: { fontWeight: 600, fontSize: '17px', color: 'var(--text-h)', textDecoration: 'none' },
  links: { display: 'flex', gap: '8px', alignItems: 'center' },
  pill: (active) => ({
    padding: '6px 18px', borderRadius: '999px', textDecoration: 'none',
    fontSize: '14px', color: active ? '#fff' : 'var(--text-h)', fontFamily: 'var(--sans)',
    background: active ? 'var(--accent)' : 'transparent',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
  }),
  fab: {
    width: '34px', height: '34px', borderRadius: '999px', border: 'none',
    background: 'var(--accent)', cursor: 'pointer', fontSize: '20px', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'
  },
  iconBtn: {
    width: '34px', height: '34px', borderRadius: '999px', border: '1px solid var(--border)',
    background: 'var(--code-bg)', cursor: 'pointer', fontSize: '15px', color: 'var(--text-h)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
  }
}

function AppNav({ onLogout, dark, onToggleTheme }) {
  const location = useLocation()
  return (
    <nav style={navS.nav}>
      <Link to="/" style={navS.logo}>ToyScout</Link>
      <div style={navS.links}>
        <Link to="/" style={navS.pill(location.pathname === '/')}>Discover</Link>
        <Link to="/history" style={navS.pill(location.pathname === '/history')}>History</Link>
        <Link to="/" style={navS.fab}>+</Link>
        <button style={navS.iconBtn} onClick={onToggleTheme} title="Toggle theme">
          {dark ? '☀️' : '🌙'}
        </button>
        <button style={navS.iconBtn} onClick={onLogout}>P</button>
      </div>
    </nav>
  )
}

function DiscoverPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [scanId, setScanId] = useState(null)
  const [result, setResult] = useState(null)

  const handleScanAgain = () => {
    setResult(null)
    setScanId(null)
  }

  return result ? (
    <>
      <ScanResult result={result} onScanAgain={handleScanAgain} />
      <RecentScans refreshKey={refreshKey} />
    </>
  ) : (
    <>
      <ImageUploader
        setScanId={setScanId}
        setResult={setResult}
        onScanComplete={() => setRefreshKey(k => k + 1)}
      />
      <ScanStatus scanId={scanId} />
      <RecentScans refreshKey={refreshKey} />
    </>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('landing')
  const [dark, toggleTheme] = useTheme()

  if (!user) {
    if (view === 'landing') return <Landing onGetStarted={() => setView('login')} dark={dark} onToggleTheme={toggleTheme} />
    return <Login onLogin={(u) => { setUser(u); setView('app') }} />
  }

  return (
    <BrowserRouter>
      <AppNav onLogout={() => { setUser(null); setView('landing') }} dark={dark} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<DiscoverPage />} />
        <Route path="/history" element={<ScanHistory />} />
      </Routes>
    </BrowserRouter>
  )
}
