import { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import DataChart from "../components/DataChart";

export default function Trends({data, onDataChange}) {
  return (
    <>
      <h2>Trends</h2>
      <h3>Track your progress</h3>

      <p>Here you can see the correlation between your health metrics and view your progress.</p>
      <section className="trend-table">
        <DataTable data={data} onDataChange={onDataChange} />
      </section>
      <section className="trend-chart">
        <DataChart data={data} />
      </section>
    </>
  )
}