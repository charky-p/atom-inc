import React, { useState, useEffect } from 'react';
import Decimal from 'break_infinity.js';
import './App.css';

function App() {
  // // Energy Units
  // const [eu, setEu] = useState('1');
  // const [quarkLevel, setQuarkLevel] = useState('0');
  // const [quarkCost, setQuarkCost] = useState('1');
  // const [quarkEU, setQuarkEU] = useState('0');
  // const [quarkBonus, setQuarkBonus] = useState('2');
  // const [quarkMulti, setQuarkMulti] = useState('1');
  // const [quarkExp, setQuarkExp] = useState('0');

  // const [leptonLevel, setLeptonLevel] = useState('0');
  // const [leptonCost, setLeptonCost] = useState('1000');
  // const [leptonEU, setLeptonEU] = useState('0');
  // const [leptonBonus, setLeptonBonus] = useState('2');

  // const [bosonLevel, setBosonLevel] = useState('0');
  // const [bosonCost, setBosonCost] = useState('1000000');
  // const [bosonEU, setBosonEU] = useState('0');
  // const [bosonBonus, setBosonBonus] = useState('2');

  // // Helper function to calculate EU generation per second
  // function calculateEUGeneration(prevEU) {
  //   const quarkDecEU = new Decimal(quarkEU);
  //   const leptonDecEU = new Decimal(leptonEU);
  //   const bosonDecEU = new Decimal(bosonEU);
  //   const prevDecEU = new Decimal(prevEU);
  //   return ((quarkDecEU.plus(leptonDecEU).plus(bosonDecEU).plus(prevDecEU)).toFixed(2).toString());
  // };

  // // Increment EU based on the generation rate every second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEu((prevEU) => calculateEUGeneration(prevEU));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [quarkLevel, leptonLevel, bosonLevel]);

  // // Handle upgrades for each type
  // function handleUpgrade(type) {
  //   if (type === 'Quark' && new Decimal(eu).gte(new Decimal(quarkCost))) {
  //     setEu(new Decimal(eu).minus(quarkCost).toFixed(2).toString());
  //     setQuarkLevel(new Decimal(quarkLevel).plus(1).toString());
  //     setQuarkCost(new Decimal(quarkCost).times(quarkLevel % 10 === 9 ? 10 : 1).toString());

  //     const quarkGen = new Decimal(0.1).times(new Decimal(quarkLevel).plus(1)).times(new Decimal(quarkMulti));
  //     const quarkPower = new Decimal(quarkLevel).plus(1).div(10).floor().plus(new Decimal(quarkExp));
  //     setQuarkEU(quarkGen.times(new Decimal(quarkBonus).pow(quarkPower)).times().toFixed(2).toString());

  //     // Apply scaling
  //   } else if (type === 'Lepton' && new Decimal(eu).gte(new Decimal(leptonCost))) {
  //     setEu(new Decimal(eu).minus(leptonCost).toFixed(2).toString());
  //     setLeptonLevel(new Decimal(leptonLevel).plus(1).toString());
  //     setLeptonCost(new Decimal(leptonCost).times(leptonLevel % 10 === 9 ? 100 : 1).toString());
  //     const bonusAmt = new Decimal(100).times(new Decimal(leptonBonus).pow(new Decimal(leptonLevel).div(10).floor()));
  //     const newLeptonEU = new Decimal(leptonEU).plus(bonusAmt).times(leptonLevel % 10 === 9 ? 10 : 1);
  //     setLeptonEU(newLeptonEU.toFixed(2).toString());
  //   } else if (type === 'Boson' && eu >= bosonCost) {
  //     setEu(new Decimal(eu).minus(bosonCost).toString());
  //     setBosonLevel(new Decimal(bosonLevel).plus(1).toString());
  //     setBosonCost(new Decimal(bosonCost).times(bosonLevel % 10 === 9 ? 10000 : 1).toString());
  //     const bonusAmt = new Decimal(1e6).times(new Decimal(bosonBonus).pow(new Decimal(bosonLevel).div(10).floor()));
  //     const newBosonEU = new Decimal(bosonEU).plus(bonusAmt).times(bosonLevel % 10 === 9 ? 10 : 1);
  //     setBosonEU(newBosonEU.toFixed(2).toString());
  //   }
  // }

  // Variables
  const [eu, setEu] = useState('1');
  const [euGen, setEuGen] = useState('0');
  const [quark, setQuark] = useState('0');

  // Functions
  const incrementEU = () => {
    setEu((eu) => new Decimal(eu).plus(1).toString());
  };

  const buyQuark = () => {
    setQuark((prevQuark) => {
      setEuGen((prevEuGen) => new Decimal(prevEuGen).plus(1).toString());
      return new Decimal(prevQuark).plus(1).toString();
    });
  };

  const reset = () => {
    setEu('1');
    setEuGen('0');
    setQuark('0');
  };

  // Interval
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'm' || event.key === 'M') {
        buyQuark();
      }
    };

    // Adding the event listener on mount
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEu(new Decimal(eu).plus(new Decimal(euGen)).toString());
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div style={styles.page}>
      <div style={styles.subtitle}>
        <h4>You have <span style={styles.amount}>{eu}</span> Energy Units (EU)</h4>
        <h4>You are generating <span style={styles.generating}>{euGen}</span> Energy Units (EU)</h4>
      </div>
      <button onClick={buyQuark} style={styles.button1}>Buy Quark: {quark}</button>
      <p>dropdown menu</p>
      <button onClick={buyQuark} style={styles.button1}>Buy Quark Gen 1: {quark}</button>
      <button onClick={buyQuark} style={styles.button1}>Buy Quark Gen 2: {quark}</button>
      <button onClick={buyQuark} style={styles.button1}>Buy Quark Gen 3: {quark}</button>
      <button onClick={buyQuark} style={styles.button1}>Buy Quark Gen 4: {quark}</button>

      <button onClick={buyQuark} style={styles.button2}>Buy Lepton: {quark}</button>
      <p>dropdown menu</p>
      <button onClick={buyQuark} style={styles.button2}>Buy Lepton Gen 1: {quark}</button>
      <button onClick={buyQuark} style={styles.button2}>Buy Lepton Gen 2: {quark}</button>
      <button onClick={buyQuark} style={styles.button2}>Buy Lepton Gen 3: {quark}</button>
      <button onClick={buyQuark} style={styles.button2}>Buy Lepton Gen 4: {quark}</button>

      <button onClick={buyQuark} style={styles.button3}>Buy Boson: {quark}</button>
      <p>dropdown menu</p>

      <button onClick={buyQuark} style={styles.button3}>Buy Boson Gen 1: {quark}</button>
      <button onClick={buyQuark} style={styles.button3}>Buy Boson Gen 2: {quark}</button>
      <button onClick={buyQuark} style={styles.button3}>Buy Boson Gen 3: {quark}</button>
      <button onClick={buyQuark} style={styles.button3}>Buy Boson Gen 4: {quark}</button>

      <button onClick={incrementEU}>DEBUG More EU</button>
      <button onClick={reset}>DEBUG Reset</button>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#333', // Page background (dark gray)
    fontFamily: "'Roboto', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
  },
  subtitle: {
    textAlign: 'center',
    color: '#bf9494' // Font colour (dark red)
  },
  amount: {
    fontSize: '36px',
    color: 'yellow',
    fontWeight: 'bold',
    textShadow: `
      0 0 5px cyan, 
      0 0 10px cyan, 
      0 0 20px cyan, 
      0 0 30px cyan, 
      0 0 40px cyan
    `, // Neon glow effect
  },
  generating: {
    fontSize: '20px',
    color: 'yellow',
    fontWeight: 'bold',
    textShadow: `
      0 0 5px cyan, 
      0 0 10px cyan, 
      0 0 20px cyan, 
      0 0 30px cyan, 
      0 0 40px cyan
    `, // Neon glow effect
  },
  button1: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ff5c5c', // Button background color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  button2: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#add8e6', // Button background color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  button3: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#008000', // Button background color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default App;
