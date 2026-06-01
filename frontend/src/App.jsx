import { useState } from 'react'
import ImageUploader from './ImageUploader'
import ScanResult from './ScanResult'
import ScanStatus from './ScanStatus'
import ScanHistory from './ScanHistory'

function App() {
  const [scanId, setScanId] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <div>
      <h1>ToyScout</h1>
      <ImageUploader setScanId={setScanId} setResult={setResult} />
      <ScanStatus scanId={scanId} />
      <ScanResult result={result} />
      <ScanHistory />
    </div>
  )
}
export default App

