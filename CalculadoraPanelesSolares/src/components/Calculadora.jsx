import React, { useState } from 'react';
import '../assets/Calculadora.css';

function Calculadora() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularPaneles = () => {
    const anchoPanel = parseInt(a, 10);
    const altoPanel = parseInt(b, 10);
    const anchoTecho = parseInt(x, 10);
    const altoTecho = parseInt(y, 10);

    if (
      isNaN(anchoPanel) || anchoPanel <= 0 ||
      isNaN(altoPanel) || altoPanel <= 0 ||
      isNaN(anchoTecho) || anchoTecho <= 0 ||
      isNaN(altoTecho) || altoTecho <= 0
    ) {
      setResultado('Por favor, introduce valores válidos.');
      return;
    }

    const panelesQueCaben = (ancho, alto, anchoT, altoT) => {
      return Math.floor(anchoT / ancho) * Math.floor(altoT / alto);
    };

    const combinacionMixta = (anchoPanel, altoPanel, anchoTecho, altoTecho) => {
      let maxPaneles = 0;

      for (let i = 0; i <= Math.floor(anchoTecho / anchoPanel); i++) {
        const anchoRestante = anchoTecho - i * anchoPanel;
        const panelesEnFila = i * Math.floor(altoTecho / altoPanel);
        const panelesRestantes = Math.floor(anchoRestante / altoPanel) * Math.floor(altoTecho / anchoPanel);
        maxPaneles = Math.max(maxPaneles, panelesEnFila + panelesRestantes);
      }

      for (let j = 0; j <= Math.floor(altoTecho / altoPanel); j++) {
        const altoRestante = altoTecho - j * altoPanel;
        const panelesEnColumna = j * Math.floor(anchoTecho / anchoPanel);
        const panelesRestantes = Math.floor(altoRestante / anchoPanel) * Math.floor(anchoTecho / altoPanel);
        maxPaneles = Math.max(maxPaneles, panelesEnColumna + panelesRestantes);
      }

      return maxPaneles;
    };

    const calcularMaxPaneles = () => {
      const orientacionNormal = panelesQueCaben(anchoPanel, altoPanel, anchoTecho, altoTecho);
      const orientacionInvertida = panelesQueCaben(altoPanel, anchoPanel, anchoTecho, altoTecho);
      const mixta = combinacionMixta(anchoPanel, altoPanel, anchoTecho, altoTecho);
      return Math.max(orientacionNormal, orientacionInvertida, mixta);
    };

    const maxPaneles = calcularMaxPaneles();

    setResultado(maxPaneles);
  };

  return (
    <div className="calculadora">
      <div className="input-group">
        <label>Dimensiones del panel solar (a x b)</label>
        <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="a" />
        <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="b" />
      </div>
      <div className="input-group">
        <label>Dimensiones del techo (x x y)</label>
        <input type="number" value={x} onChange={(e) => setX(e.target.value)} placeholder="x" />
        <input type="number" value={y} onChange={(e) => setY(e.target.value)} placeholder="y" />
      </div>
      <button onClick={calcularPaneles}>Calcular</button>
      {resultado !== null && (
        <div className="resultado">
          <h2>{typeof resultado === 'number' ? `Máximo número de paneles que caben: ${resultado}` : resultado}</h2>
        </div>
      )}
    </div>
  );
}

export default Calculadora;
