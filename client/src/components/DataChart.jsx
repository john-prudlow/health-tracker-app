import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function DataChart({ data }) {
  const [visible, setVisible] = useState({
    steps: true,
    sleep: true,
    weight: true
  });

  const toggleMetric = (metric) => {
    setVisible(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  // Normalize metrics once using useMemo for stability
  const normalizedData = useMemo(() => {
    const normalize = (arr, key) => {
      const values = arr.map(d => d[key]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      return arr.map(d => ({
        ...d,
        [key + "_norm"]: (d[key] - min) / (max - min)
      }));
    };

    let result = data;
    ["steps", "sleep", "weight"].forEach(key => {
      result = normalize(result, key);
    });

    return result;
  }, [data]);

  return (
    <>
      <div className="chart-buttons">
        <button
          onClick={() => toggleMetric("steps")}
          style={{ opacity: visible.steps ? 1 : 0.4 }}
        >
          Steps
        </button>

        <button
          onClick={() => toggleMetric("sleep")}
          style={{ opacity: visible.sleep ? 1 : 0.4 }}
        >
          Sleep
        </button>

        <button
          onClick={() => toggleMetric("weight")}
          style={{ opacity: visible.weight ? 1 : 0.4 }}
        >
          Weight
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={600} height={300} data={normalizedData}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1]} tickFormatter={() => ""} />

          <Tooltip
            formatter={(value, name, props) => {
              const original = props.payload[name.replace("_norm", "")];
              return [`${original}`, name.replace("_norm", "")];
            }}
          />

          {visible.steps && (
            <Line type="monotone" dataKey="steps_norm" stroke="#8884d8" />
          )}

          {visible.sleep && (
            <Line type="monotone" dataKey="sleep_norm" stroke="#82ca9d" />
          )}

          {visible.weight && (
            <Line type="monotone" dataKey="weight_norm" stroke="#ff7300" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}