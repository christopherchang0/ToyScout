import { useState } from 'react'
import Login from './Login'
import ImageUploader from './ImageUploader'
import ScanResult from './ScanResult'
import ScanStatus from './ScanStatus'
import ScanHistory from './ScanHistory'

function App() {
  const [user, setUser] = useState(null)
  const [scanId, setScanId] = useState(null)
  const [result, setResult] = useState(null)
      
  if (!user) return <Login onLogin={setUser} />


  return (
    <div>
      <h1>ToyScout</h1>
      <button onClick={() => setUser(null)}>Log out</button>
      <ImageUploader setScanId={setScanId} setResult={setResult} />
      <ScanStatus scanId={scanId} />
      <ScanResult result={result} />
      <ScanHistory />
    </div>
  )
}
export default App

