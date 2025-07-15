import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
  RadialBarChart, RadialBar,
} from 'recharts';
import {
  FiImage, FiSliders, FiUserCheck, FiUsers,
  FiMessageCircle, FiFlag, FiCheckCircle,
  FiArrowUp, FiArrowDown, FiBell, FiSettings, FiCheckSquare, FiTrash2
} from 'react-icons/fi';
import RealTimeHits from './RealTimeHits';
import './dashboard.css';
import MiniChat from './MiniChat';

const SECTIONS = [
  'slider', 'features', 'daily-offer', 'header-settings', 'menu-config',
  'chefs', 'team-section', 'testimonials', 'testimonial-section',
  'counter-settings', 'footer-settings', 'menu-section', 'menu-items'
];
const SECTION_LABELS = {
  slider: 'Sliders', features: 'Why Choose Us', 'daily-offer': 'Daily Offer',
  'header-settings': 'Header Settings', 'menu-config': 'Menu Config',
  chefs: 'Manage Chefs', 'team-section': 'Team Section', testimonials: 'Testimonials',
  'testimonial-section': 'Testimonial Section', 'counter-settings': 'Counter Section',
  'footer-settings': 'Footer Settings', 'menu-section': 'Menu Section', 'menu-items': 'Menu Items'
};
const ICONS = {
  Sliders: <FiImage />, 'Why Choose Us': <FiSliders />, 'Daily Offer': <FiFlag />,  
  'Header Settings': <FiSliders />, 'Menu Config': <FiSettings />, 'Manage Chefs': <FiUsers />,  
  'Team Section': <FiUserCheck />, Testimonials: <FiMessageCircle />, 'Testimonial Section': <FiMessageCircle />,  
  'Counter Section': <FiCheckCircle />, 'Footer Settings': <FiCheckCircle />, 'Menu Section': <FiSettings />, 'Menu Items': <FiSettings />
};
const COLORS = ['#8884d8','#82ca9d','#ffc658','#ff8042','#8dd1e1','#a4de6c','#d0ed57'];

const makeSpark = () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 10);

function KPICard({ label, value, sparkData, idx }) {
  const trend = sparkData[sparkData.length - 1] - sparkData[0];
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card glass h-100 border-0 p-3">
        <div className="icon-wrap mb-2" style={{ color: COLORS[idx] }}>
          {ICONS[label]}
        </div>
        <h6 className="text-muted">{label}</h6>
        <p className="display-6 mb-1">{value}</p>
        <div className={`trend ${trend >= 0 ? 'up' : 'down'}`}> 
          {trend >= 0 ? <FiArrowUp /> : <FiArrowDown />} {Math.abs(trend)}
        </div>
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={sparkData.map((v, i) => ({ i, v }))}>
            <Area type="monotone" dataKey="v" stroke={COLORS[idx]} fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function GaugeCard({ label, value, idx, thresholds = [30, 70] }) {
  let fill = COLORS[idx];
  if (value >= thresholds[1]) fill = '#dc3545';
  else if (value >= thresholds[0]) fill = '#ffc658';
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card glass h-100 border-0 p-3 text-center">
        <h6 className="text-muted mb-2">{label} Gauge</h6>
        <ResponsiveContainer width="100%" height={150}>
          <RadialBarChart
            cx="50%"
            cy="80%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={12}
            data={[{ name: label, value }]}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" fill={fill} />
            <ReTooltip />
          </RadialBarChart>
        </ResponsiveContainer>
        <p className="mt-2 display-6" style={{ color: fill }}>{value}</p>
      </div>
    </div>
  );
}

function Notifications({ socket }) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = note => setList(l => [note, ...l]);
    socket.on('notification', handler);

    const sim = setInterval(() => {
      setList(l => [{ text: 'Reminder: Review new chefs', time: new Date().toLocaleTimeString() }, ...l]);
    }, 30000);

    return () => {
      socket.off('notification', handler);
      clearInterval(sim);
    };
  }, [socket]);

  return (
    <div className="position-relative me-4">
      <button className="btn btn-link position-relative" onClick={() => setOpen(o => !o)}>
        <FiBell size={24} /> <span className="badge bg-danger">{list.length}</span>
      </button>
      {open && (
        <div className="card glass p-3 position-absolute end-0 mt-2" style={{ minWidth: 240, zIndex: 1000 }}>
          <h6>Notifications</h6>
          {list.slice(0, 5).map((n, i) => (
            <div key={`${n.text}-${i}`}>
              <small className="text-muted">{n.time}</small>
              <div>{n.text}</div>
              <hr />
            </div>
          ))}
          <button className="btn btn-sm btn-link" onClick={() => setList([])}>Clear all</button>
        </div>
      )}
    </div>
  );
}

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const add = useCallback(() => {
    if (!task.trim()) return;
    setTodos(ts => [...ts, { text: task, done: false }]);
    setTask('');
  }, [task]);

  const toggle = useCallback(i =>
    setTodos(ts => ts.map((t, idx) => idx === i ? { ...t, done: !t.done } : t)), []);

  const del = useCallback(i =>
    setTodos(ts => ts.filter((_, idx) => idx !== i)), []);

  return (
    <div className="card glass p-3">
      <h5>To-Do List</h5>
      <div className="input-group mb-2">
        <input type="text" className="form-control" placeholder="New task..." value={task} onChange={e => setTask(e.target.value)} />
        <button className="btn btn-success" onClick={add}><FiCheckSquare /></button>
      </div>
      <ul className="list-unstyled">
        {todos.map((t, i) => (
          <li key={i} className="d-flex justify-content-between align-items-center">
            <span onClick={() => toggle(i)} style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              {t.text}
            </span>
            <FiTrash2 style={{ cursor: 'pointer' }} onClick={() => del(i)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24e6));
  const [endDate, setEndDate] = useState(new Date());
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket'],
      path: '/socket.io'
    });
    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/admin/metrics', {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    })
      .then(res => setStats(res.data))
      .catch(err => {
        console.error('Error fetching metrics:', err);
        setStats(null);
      })
      .finally(() => setLoading(false));
  }, [startDate, endDate]);

  useEffect(() => {
    const handler = ({ section, metrics }) => {
      setStats(prev => ({ ...prev, [section]: metrics[section] }));
    };
    socketRef.current?.on('statsUpdate', handler);
    return () => socketRef.current?.off('statsUpdate', handler);
  }, []);

  const cardData = useMemo(() =>
    SECTIONS.map((sec, i) => ({
      label: SECTION_LABELS[sec],
      value: stats?.[sec] || 0,
      sparkData: makeSpark(),
      idx: i
    })), [stats]);

  const pieData = useMemo(() =>
    cardData.filter(d => d.value > 0).map(d => ({ name: d.label, value: d.value })), [cardData]);

  if (loading) return <p className="text-center mt-5">Loading…</p>;
  if (!stats) return <p className="text-center mt-5 text-danger">Error loading dashboard.</p>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-gradient">Admin Dashboard</h1>
        <div className="d-flex align-items-center">
          <span className="me-3">{now.toLocaleTimeString()}</span>
          <Notifications socket={socketRef.current} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 d-flex align-items-center gap-2">
          <DatePicker selected={startDate} onChange={setStartDate} />
          <DatePicker selected={endDate} onChange={setEndDate} />
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary me-2"><FiSettings className="me-1" />New Slider</button>
          <button className="btn btn-success me-2"><FiSettings className="me-1" />New Menu Item</button>
          <button className="btn btn-warning"><FiSettings className="me-1" />Settings</button>
        </div>
      </div>

      <div className="row gx-3 gy-4 mb-5">
        {cardData.map(d => <KPICard key={d.label} {...d} />)}
      </div>

      <div className="row gx-4 gy-4 mb-5">
        {cardData.slice(0, 4).map(d => <GaugeCard key={d.label} {...d} />)}
      </div>

      <div className="row gx-4 gy-4 mb-5">
        <div className="col-lg-6">
          <div className="card glass p-3">
            <h5>Content Distribution</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <ReTooltip />
                <ReLegend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card glass p-3">
            <h5>Section Counts</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <ReTooltip />
                <Bar dataKey="value">
                  {cardData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <RealTimeHits />

      <div className="row gx-4 gy-4">
        <div className="col-lg-6">
          <div className="card glass p-3 mb-5">
            <h5>Recent Activity</h5>
            <ul className="timeline">
              {['Added new slider', 'Updated header settings', '3 chefs approved', 'Testimonial added', 'Menu item created'].map((evt, i) => (
                <li key={i}><span className="dot" /> {evt}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-3"><MiniChat /></div>
        <div className="col-lg-3"><ToDoList /></div>
      </div>
    </div>
  );
}
