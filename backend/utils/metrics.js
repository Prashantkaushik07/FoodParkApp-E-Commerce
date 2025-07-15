// backend/utils/metrics.js

// A simple in-memory store — keys will be the first segment
// after /api/admin, e.g. "slider", "menu-items", "header-settings", etc.
const metrics = {};

// Middleware: bump the counter for whatever section was called
export function metricMiddleware(req, res, next) {
  // req.path here is the part *after* "/api/admin", e.g. "/slider" or "/menu-items/123"
  const clean = req.path.replace(/^\/+/, '');   // remove leading slash
  const parts = clean.split('/');
  const section = parts[0];                      // take the first segment
  if (section) {
    metrics[section] = (metrics[section] || 0) + 1;
  }
  next();
}

// Getter for the front end
export function getMetrics() {
  return { ...metrics };
}
