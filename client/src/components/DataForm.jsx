import { useState } from "react";

export default function DataForm({onDataChange}) {
  const [ showForm, setShowForm ] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    steps: "",
    sleep: "",
    weight: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      date: formData.date,
      steps: parseInt(formData.steps, 10),
      sleep: parseFloat(formData.sleep),
      weight: parseFloat(formData.weight)
    };

    try {
      const res = await fetch("http://localhost:3001/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.status === 409) {
        const existing = await res.json();
        if (existing && confirm(`Date already exists. Do you wish to update this entry?`)) {
          const putRes = await fetch(`http://localhost:3001/api/data/${existing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!putRes.ok) {
            console.error("Failed to update entry");
            return;
          }
          const updated = await putRes.json();
          if (onDataChange) onDataChange(updated);
          setFormData({ date: "", steps: "", sleep: "", weight: "" });
        }
        return;
      }
      const stored = await res.json();
      if (onDataChange) onDataChange(stored);
      setFormData({ date: "", steps: "", sleep: "", weight: "" });
    } catch (err) {
      console.error("Failed to store data:", err);
    }
    setShowForm(false);
  };

  return (
    <>
      { !showForm ? (
        <button className="add-data-btn" onClick={() => { setShowForm(true)}}>Add Health Entry</button>
      ) : (
        <div className="health-data-form">
          <h2>ENTER HEALTH DATA</h2>
          <form onSubmit={handleSubmit} className="health-entry-form">
            <label htmlFor="date">Date (YYYY-MM-DD):</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label htmlFor="steps">Steps:</label>
            <input
              id="steps"
              type="number"
              value={formData.steps}
              onChange={handleChange}
              required
            />
            <label htmlFor="sleep">Sleep (hours):</label>
            <input
              id="sleep"
              type="number"
              step="0.1"
              value={formData.sleep}
              onChange={handleChange}
              required
            />
            <label htmlFor="weight">Weight (lbs):</label>
            <input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit Data</button>
            {/* <button type="button" onClick={onCancel}>Cancel</button> */}
          </form>
        </div>
      )}
    </>
  )
}