// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; // ✅ For __dirname in ES Modules

import adminRoutes               from './routes/adminRoutes.js';
import sliderRoutes              from './routes/sliderRoutes.js';
import featureRoutes             from './routes/featureRoutes.js';
import dailyOfferRoutes          from './routes/dailyOfferRoutes.js';
import headerSettingsRoutes      from './routes/headerSettingsRoutes.js';
import menuConfigRoutes          from './routes/menuConfigRoutes.js';
import chefsRoutes               from './routes/chefs.js';
import teamSectionRoutes         from './routes/teamSectionRoutes.js';
import testimonials               from './routes/testimonials.js';
import testimonialSectionRoutes  from './routes/testimonialSectionRoutes.js';
import counterAdminRoutes        from './routes/counterSettingsRoutes.js';
import footerAdminRoutes         from './routes/footerSettingsRoutes.js';
import menuSectionRouter         from './routes/menuSection.js';
import menuItemsRouter           from './routes/menuItems.js';
import { metricMiddleware, getMetrics } from './utils/metrics.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:5173', methods: ['GET','POST','PUT','DELETE'] } // ✅ Use env var for frontend URL in CORS
});

const PORT = process.env.PORT || 5000; // ✅ Use Render or Vercel-provided PORT

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directories exist
const UPLOAD_ROOT    = path.join(process.cwd(), 'uploads');
const SLIDER_UPLOADS = path.join(UPLOAD_ROOT, 'sliders');
const CHEF_UPLOADS   = path.join(UPLOAD_ROOT, 'chefs');
fs.mkdirSync(SLIDER_UPLOADS, { recursive: true });
fs.mkdirSync(CHEF_UPLOADS,    { recursive: true });

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // ✅ Use env var here too
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static(UPLOAD_ROOT));

// Public API for front-end
app.use('/api/slider',            sliderRoutes);
app.use('/api/features',           featureRoutes);
app.use('/api/daily-offer',        dailyOfferRoutes);
app.use('/api/header-settings',    headerSettingsRoutes);
app.use('/api/menu-config',        menuConfigRoutes);
app.use('/api/chefs',              chefsRoutes);
app.use('/api/team-section',       teamSectionRoutes);
app.use('/api/testimonials',       testimonials);
app.use('/api/testimonial-section', testimonialSectionRoutes);
app.use('/api/counter-settings',   counterAdminRoutes);
app.use('/api/footer-settings',    footerAdminRoutes);
app.use('/api/menu-section',       menuSectionRouter);
app.use('/api/menu-items',         menuItemsRouter);

// Attach metric middleware for all admin endpoints
app.use('/api/admin', metricMiddleware);

// Admin API (no token auth in this example)
app.use('/api/admin',               adminRoutes);
app.use('/api/admin/slider',        sliderRoutes);
app.use('/api/admin/features',      featureRoutes);
app.use('/api/admin/daily-offer',   dailyOfferRoutes);
app.use('/api/admin/header-settings',  headerSettingsRoutes);
app.use('/api/admin/menu-config',   menuConfigRoutes);
app.use('/api/admin/chefs',         chefsRoutes);
app.use('/api/admin/team-section',  teamSectionRoutes);
app.use('/api/admin/testimonials',  testimonials);
app.use('/api/admin/testimonial-section', testimonialSectionRoutes);
app.use('/api/admin/counter-settings',  counterAdminRoutes);
app.use('/api/admin/footer-settings',   footerAdminRoutes);
app.use('/api/admin/menu-section',      menuSectionRouter);
app.use('/api/admin/menu-items',        menuItemsRouter);

// Metrics endpoint: emit real-time updates
app.get('/api/admin/metrics', (req, res) => {
  const metrics = getMetrics();
  io.emit('metricsUpdate', metrics);
  res.json(metrics);
});

// Emit on each admin slider modification
app.use('/api/admin/slider', (req, res, next) => {
  next();
  const metrics = getMetrics();
  io.emit('statsUpdate', { section: 'slider', metrics });
});

// ✅ Serve React frontend build (for fullstack deploy)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Catch-all route for React Router (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optional 404 handler (API-only)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// ✅ Start server only if NOT in Vercel Serverless environment
if (!process.env.VERCEL) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

// ✅ Export app for Vercel Serverless
export default app;
