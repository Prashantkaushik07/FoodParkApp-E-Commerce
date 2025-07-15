// src/components/Admin/RealTimeHits.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

// Establish WebSocket-only connection to avoid polling errors
const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  path: '/socket.io'
});

// List of admin sections to track
const SECTIONS = [
  'slider',
  'features',
  'daily-offer',
  'header-settings',
  'menu-config',
  'chefs',
  'team-section',
  'testimonials',
  'testimonial-section',
  'counter-settings',
  'footer-settings',
  'menu-section',
  'menu-items'
];

// Colors for the chart lines
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
  '#8dd1e1', '#a4de6c', '#d0ed57', '#a28fd0',
  '#d884ff', '#ff6b6b', '#6bcaff', '#ffd36b', '#cea2ff'
];

export default function RealTimeHits() {
  const [data, setData] = useState([]);
  const counterRef = React.useRef(0);

  // Initial snapshot via HTTP
  useEffect(() => {
    axios.get('/api/admin/metrics')
      .then(res => {
        counterRef.current += 1;
        setData([{ timestamp: counterRef.current, ...res.data }]);
      })
      .catch(console.error);
  }, []);

  // Subscribe to live WebSocket updates
  useEffect(() => {
    const handle = metrics => {
      counterRef.current += 1;
      const entry = { timestamp: counterRef.current, ...metrics };
      setData(prev => [...prev.slice(-19), entry]);
    };

    socket.on('metricsUpdate', handle);
    return () => {
      socket.off('metricsUpdate', handle);
    };
  }, []);

  if (data.length === 0) {
    return <p>Loading real-time metrics…</p>;
  }

  return (
    <div className="card glass p-3 mb-4">
      <h5 className="mb-3">Real-Time API Hits</h5>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="timestamp" tick={false} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          {SECTIONS.map((sec, idx) => (
            <Area
              key={sec}
              type="monotone"
              dataKey={sec}
              stroke={COLORS[idx % COLORS.length]}
              fill={COLORS[idx % COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
