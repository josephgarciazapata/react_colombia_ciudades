import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [departamentos, setDepartamentos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Department')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setDepartamentos(datos)
        setCargando(false)
      })
      .catch(error => {
        console.error(error)
        setCargando(false)
      })
  }, [])

  return (
    <div>
      <h1>Departamentos de Colombia</h1>
      {cargando ? (
        <p style={{textAlign: 'center'}}>Cargando...</p>
      ) : (
        <div className="grid">
          {departamentos.map(depto => (
            <div key={depto.id} className="card">
              <h2>{depto.name}</h2>
              <p><strong>Población:</strong> {new Intl.NumberFormat('es-CO').format(depto.population)}</p>
              <p><strong>Superficie:</strong> {new Intl.NumberFormat('es-CO').format(depto.surface)} km²</p>
              <p><strong>Municipios:</strong> {depto.municipalities}</p>
              <span className="badge">Capital: {depto.cityCapital?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
