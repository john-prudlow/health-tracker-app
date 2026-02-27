import { useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router'

import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import HealthData from './pages/HealthData'
import Trends from './pages/Trends'
import Login from './pages/Login'

import { AuthContext } from './context/AuthContext'

import './style.css'
import './css/responsive.css'

function App() {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  const healthData = async () => {
    try {
      const res = await fetch('/api/data', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        console.error("Unauthorized or failed request");
        return;
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching homepage data:", err);
    }
  };

  useEffect(() => {
    if (token) {
      healthData();
    }
  }, [token]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/health-data" element={<HealthData data={data} onDataChange={healthData} />} />
          <Route path="/trends" element={<Trends data={data} onDataChange={healthData} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App