import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import ImageUploader from './ImageUploader'
import ScanResult from './ScanResult'
import ScanStatus from './ScanStatus'
import ScanHistory from './ScanHistory'

function ScanPage({ user, setUser }) {
    const [scanId, setScanId] = useState(null)
    const [result, setResult] = useState(null)

    return (
        <div>
            <nav>
                <Link to="/">Scan</Link>
                <Link to="/history">History</Link>
                <button onClick={() => setUser(null)}>Log out</button>
            </nav>
            <ImageUploader setScanId={setScanId} setResult={setResult} />
            <ScanStatus scanId={scanId} />
            <ScanResult result={result} />
        </div>
    )
}

function HistoryPage({ setUser }) {
    return (
        <div>
            <nav>
                <Link to="/">Scan</Link>
                <Link to="/history">History</Link>
                <button onClick={() => setUser(null)}>Log out</button>
            </nav>
            <ScanHistory />
        </div>
    )
}

function App() {
    const [user, setUser] = useState(null)

    if (!user) return <Login onLogin={setUser} />

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScanPage user={user} setUser={setUser} />} />
                <Route path="/history" element={<HistoryPage setUser={setUser} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App