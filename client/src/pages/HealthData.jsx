import { useState, useEffect } from "react";
import DataForm from "../components/DataForm";
import DataTable from "../components/DataTable";

export default function HealthData({data, onDataChange}) {
  return (
    <>
      <h2>Health Data</h2>
      <DataForm onDataChange={onDataChange} />
      <DataTable data={data} onDataChange={onDataChange} />
    </>
  )
}