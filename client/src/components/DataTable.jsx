import { useState } from "react";

export default function DataTable({data, onDataChange}) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleDelete = async (item) => {
    if (confirm(`Are you sure you want to delete data for "${item.date}"?`)) {
      try {
        const res = await fetch(`http://localhost:3001/api/data/${item._id}`, {
            method: "DELETE"
        });
        if (onDataChange) onDataChange();
      } catch (err) {
        console.error("Failed to delete data:", err);
      }
    }
  }
  const handleUpdate = async () => {
    try {
      const putRes = await fetch(`http://localhost:3001/api/data/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues)
      });
      if (!putRes.ok) {
        console.error("Failed to update entry"); return;
      }
      if (onDataChange) onDataChange();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update data:", err);
    }
  }
  const editFields = (item) => {
    setEditingId(item._id);
    setEditValues({
      date: item.date,
      steps: item.steps,
      sleep: item.sleep,
      weight: item.weight
    });
  };
  return (
    <table>
      <thead>
          <tr>
            <th></th>
            <th>Steps</th>
            <th>Sleep</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data.map(item => {
          const isEditing = editingId === item._id;

          return (
            <tr key={item._id}>
              <td>
                {isEditing ? (
                  <input
                    type="date"
                    value={editValues.date}
                    onChange={e =>
                      setEditValues({ ...editValues, date: e.target.value })
                    }
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={editValues.steps}
                    onChange={e =>
                      setEditValues({ ...editValues, steps: e.target.value })
                    }
                  />
                ) : (
                  item.steps
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={editValues.sleep}
                    onChange={e =>
                      setEditValues({ ...editValues, sleep: e.target.value })
                    }
                  />
                ) : (
                  item.sleep
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={editValues.weight}
                    onChange={e =>
                      setEditValues({ ...editValues, weight: e.target.value })
                    }
                  />
                ) : (
                  item.weight
                )}
              </td>
              <td className="change-item">
                {isEditing ? (
                  <>
                    <button className="save-changes" onClick={handleUpdate}>SAVE</button>
                    <button className="cancel-changes" onClick={() => setEditingId(null)}>CANCEL</button>
                  </>
                ) : (
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => editFields(item)}
                  ></i>
                )}
                &nbsp;&nbsp;
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete(item)}
                ></i>
              </td>
            </tr>
          );
        })}
        </tbody>
    </table>
  )
}