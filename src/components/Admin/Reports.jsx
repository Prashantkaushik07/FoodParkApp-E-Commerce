// src/components/Admin/Reports.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend
} from 'recharts';
import RealTimeHits from './RealTimeHits';  // your wave chart
// import './reports.css';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
  '#8dd1e1', '#a4de6c', '#d0ed57', '#a28fd0'
];

export default function Reports() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/metrics')
      .then(res => setMetrics(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reports…</p>;
  if (!metrics) return <p className="text-danger">Error loading reports.</p>;

  // transform into array for table & chart
  const data = Object.entries(metrics).map(([name, value]) => ({ name, value }));

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Reports</h2>

      {/* ─── Metrics Table ──────────────────────────────────────── */}
      <div className="mb-5">
        <h5>Current Section Hit Counts</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Section</th>
              <th>Hits</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="row gx-4 gy-4">
        {/* ─── Pie Chart ───────────────────────────────────────── */}
        <div className="col-lg-6">
          <div className="card glass p-3 h-100">
            <h5 className="mb-3">Usage Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ─── Real-Time Wave Chart ─────────────────────────────── */}
        <div className="col-lg-6">
          <RealTimeHits />
        </div>
      </div>
    </div>
  );
}
