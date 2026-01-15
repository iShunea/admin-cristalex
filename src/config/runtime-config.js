// Runtime configuration helper
// Configuration is injected into HTML by server for security
// No public API endpoint - config is only available to loaded page

// Fallback configuration if not injected by server (dev mode)
const getFallbackConfig = () => ({
  // Required configuration
  API_URL: import.meta.env.VITE_APP_API_URL || 'https://backend-cristalex-dent.onrender.com/',
  VERSION: import.meta.env.VITE_APP_VERSION || 'v9.2.1',
  BASE_NAME: import.meta.env.VITE_APP_BASE_NAME || '/',

  // Optional: Only needed if using Google Maps autocomplete feature
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || '',

  // Optional: Only needed if using Mapbox map pages
  MAPBOX_ACCESS_TOKEN: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN || ''
});

// Initialize config from server-injected window.__RUNTIME_CONFIG__ or fallback
if (!window.__RUNTIME_CONFIG__) {
  console.warn('Runtime config not injected by server, using fallback (dev mode)');
  window.__RUNTIME_CONFIG__ = getFallbackConfig();
}

// Promise resolves immediately since config is already available
if (!window.__RUNTIME_CONFIG_PROMISE__) {
  window.__RUNTIME_CONFIG_PROMISE__ = Promise.resolve(window.__RUNTIME_CONFIG__);
}

// Synchronous getter with cached values
const getConfig = (key, fallback = '') => {
  // Return cached value if available
  if (window.__RUNTIME_CONFIG__) {
    return window.__RUNTIME_CONFIG__[key] || fallback;
  }

  // Fallback to build-time env while loading
  return import.meta.env[`VITE_APP_${key}`] || fallback;
};

// Export synchronous config object (uses cached values with getters)
export const config = {
  // Required configuration
  get API_URL() { return getConfig('API_URL', 'https://backend-cristalex-dent.onrender.com/'); },
  get VERSION() { return getConfig('VERSION', 'v9.2.1'); },
  get BASE_NAME() { return getConfig('BASE_NAME', '/'); },

  // Optional: Only needed if using Google Maps autocomplete feature
  get GOOGLE_MAPS_API_KEY() { return getConfig('GOOGLE_MAPS_API_KEY'); },

  // Optional: Only needed if using Mapbox map pages
  get MAPBOX_ACCESS_TOKEN() { return getConfig('MAPBOX_ACCESS_TOKEN'); },

  // Legacy support for Firebase auth (if you switch from JWT to Firebase)
  get FIREBASE() {
    return window.__RUNTIME_CONFIG__?.FIREBASE || {};
  },

  // Legacy support for AWS Cognito auth (if you switch from JWT to AWS)
  get AWS() {
    return window.__RUNTIME_CONFIG__?.AWS || {};
  },

  // Legacy support for Auth0 (if you switch from JWT to Auth0)
  get AUTH0() {
    return window.__RUNTIME_CONFIG__?.AUTH0 || {};
  }
};

// Export promise for components that need to wait for config
export const configReady = window.__RUNTIME_CONFIG_PROMISE__;

export default config;
