// src/apiList.js

// Base URL (you can switch to an env var if you like)
const BASE_URL = 'http://localhost:5000/api';

export const apiList = {
  // Authentication
  ADMIN_LOGIN:        `${BASE_URL}/admin/login`,

  // Dashboard metrics
  ADMIN_METRICS:      `${BASE_URL}/admin/metrics`,      // GET

  // Sliders
  ADMIN_SLIDER:       `${BASE_URL}/admin/slider`,       // GET all / POST create
  ADMIN_SLIDER_BY_ID: (id) => `${BASE_URL}/admin/slider/${id}`, // GET/PUT/DELETE

  // Features (“Why Choose Us”)
  ADMIN_FEATURE:        `${BASE_URL}/admin/features`,
  ADMIN_FEATURE_BY_ID:  (id) => `${BASE_URL}/admin/features/${id}`,

  // Daily Offers
  ADMIN_DAILY_OFFER:        `${BASE_URL}/admin/daily-offer`,
  ADMIN_DAILY_OFFER_BY_ID:  (id) => `${BASE_URL}/admin/daily-offer/${id}`,

  // Header Settings (singleton)
  ADMIN_HEADER_SETTINGS:    `${BASE_URL}/admin/header-settings`, // GET/POST upsert

  // Menu Config (singleton or list)
  ADMIN_MENU_CONFIG:        `${BASE_URL}/admin/menu-config`,
  ADMIN_MENU_CONFIG_BY_ID:  (id) => `${BASE_URL}/admin/menu-config/${id}`,

  // Chefs
  ADMIN_CHEFS:        `${BASE_URL}/admin/chefs`,
  ADMIN_CHEF_BY_ID:   (id) => `${BASE_URL}/admin/chefs/${id}`,

  // Team Section
  ADMIN_TEAM:         `${BASE_URL}/admin/team-section`,
  ADMIN_TEAM_BY_ID:   (id) => `${BASE_URL}/admin/team-section/${id}`,

  // Testimonials
  ADMIN_TESTIMONIAL:        `${BASE_URL}/admin/testimonials`,
  ADMIN_TESTIMONIAL_BY_ID:  (id) => `${BASE_URL}/admin/testimonials/${id}`,

  // Counter Settings
  ADMIN_COUNTER:       `${BASE_URL}/admin/counter-settings`,
  ADMIN_COUNTER_BY_ID: (id) => `${BASE_URL}/admin/counter-settings/${id}`,

  // Footer Settings (singleton)
  ADMIN_FOOTER_SETTINGS:    `${BASE_URL}/admin/footer-settings`, // GET/POST upsert

  // Menu Section (e.g. menu categories)
  ADMIN_MENU_SECTION:        `${BASE_URL}/admin/menu-section`,
  ADMIN_MENU_SECTION_BY_ID:  (id) => `${BASE_URL}/admin/menu-section/${id}`,

  // Menu Items (individual dishes)
  ADMIN_MENU_ITEM:           `${BASE_URL}/admin/menu-items`,
  ADMIN_MENU_ITEM_BY_ID:     (id) => `${BASE_URL}/admin/menu-items/${id}`,

  // …add any other endpoints you spin up under /admin
};
