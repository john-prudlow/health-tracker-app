import { useState, useEffect } from "react";
import DataForm from "../components/DataForm";
import DataTable from "../components/DataTable";

export default function Homepage() {
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
      <h1>HOMEPAGE</h1>
      <DataForm onDataStored={healthData} />
      <DataTable data={data} onDataChange={healthData} />
    </>
  )
}