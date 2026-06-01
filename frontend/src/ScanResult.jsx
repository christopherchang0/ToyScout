function ScanResult({ result }) {
    if (!result) return null;
    return (
    <div>
      <h2>{result.name}</h2>
      <p>Brand: {result.brand}</p>
      <p>Year: {result.year}</p>
      <p>{result.description}</p>
    </div>
  )
}
export default ScanResult