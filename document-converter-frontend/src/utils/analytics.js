// AI assisted development
// Google Analytics and Conversion Tracking

// Initialize Google Analytics
export const initGA = (gaId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', gaId, {
      page_path: window.location.pathname,
    });
  }
};

// Track Page View
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
    });
  }
};

// Track Conversion Event
export const trackConversion = (conversionType, fileName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXXX/XXXXXXXXXX', // Replace with your conversion ID
      'event_category': 'Document Conversion',
      'event_label': conversionType,
      'value': 1.0,
      'currency': 'USD',
    });
    
    // Track custom event
    window.gtag('event', 'file_converted', {
      'event_category': 'Conversion',
      'event_label': conversionType,
      'file_name': fileName,
    });
  }
};

// Track File Upload
export const trackFileUpload = (fileType, fileSize) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_upload', {
      'event_category': 'User Action',
      'event_label': fileType,
      'value': fileSize,
    });
  }
};

// Track Button Click
export const trackButtonClick = (buttonName, location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      'event_category': 'User Interaction',
      'event_label': buttonName,
      'location': location,
    });
  }
};

// Track Error
export const trackError = (errorType, errorMessage) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      'description': errorMessage,
      'fatal': false,
    });
  }
};


