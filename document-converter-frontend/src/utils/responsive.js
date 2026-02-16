// AI assisted development
// Responsive utility functions

// Detect device type
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width <= 480) return 'mobile';
  if (width <= 768) return 'tablet';
  if (width <= 1024) return 'small-desktop';
  return 'desktop';
};

// Check if mobile device
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

// Check if touch device
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get viewport dimensions
export const getViewport = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Handle resize events
export const useResponsive = (callback) => {
  if (typeof window === 'undefined') return;
  
  const handleResize = () => {
    callback(getDeviceType(), getViewport());
  };
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Initial call
  
  return () => window.removeEventListener('resize', handleResize);
};


