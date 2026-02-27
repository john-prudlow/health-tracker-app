import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'

import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import HealthData from './pages/HealthData'
import Trends from './pages/Trends'

import './style.css'
import './css/responsive.css'

function App() {
  const [data, setData] = useState([]);
  
  const healthData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching homepage data:", err);
    }
  };

  useEffect(() => {
    healthData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/health-data" element={<HealthData data={data} onDataChange={healthData} />} />
          <Route path="/trends" element={<Trends data={data} onDataChange={healthData} />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App