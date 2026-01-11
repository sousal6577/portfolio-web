import { useState } from 'react'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Portfolio Web</h1>
        <p>Sistema de Portfólio Profissional</p>
        <div className="features">
          <div className="feature-card">
            <h3>📱 PWA Generator</h3>
            <p>Crie Progressive Web Apps rapidamente</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Templates</h3>
            <p>Templates prontos para sites modernos</p>
          </div>
          <div className="feature-card">
            <h3>🖥️ Server Manager</h3>
            <p>Gerencie deploys e servidores</p>
          </div>
          <div className="feature-card">
            <h3>📂 Portfolio</h3>
            <p>Showcase de projetos realizados</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
