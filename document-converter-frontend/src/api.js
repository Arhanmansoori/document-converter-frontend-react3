// AI assisted development
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 300000, // 5 minutes for large file conversions
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Helper function to download file from blob
const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

// Check backend health
export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (err) {
    console.error("Backend health check failed:", err);
    return null;
  }
};

// Convert single file
export const convertFile = async (file, endpoint) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(endpoint, formData, {
      responseType: "blob",
    });

    // Check if response is actually a PDF
    if (response.data.type && !response.data.type.includes("pdf")) {
      // Try to parse as JSON error
      const text = await response.data.text();
      try {
        const error = JSON.parse(text);
        throw new Error(error.detail || "Conversion failed");
      } catch {
        throw new Error("Invalid response from server");
      }
    }

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.[^/.]+$/, ".pdf");
    downloadFile(blob, filename);

    // Get latest conversion metadata
    try {
      const info = await apiClient.get("/conversion/latest");
      return info.data;
    } catch (err) {
      console.error("Could not fetch conversion info:", err);
      return null;
    }
  } catch (error) {
    if (error.response) {
      // Handle error response
      if (error.response.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.detail || "Conversion failed");
        } catch {
          throw new Error("Server error occurred");
        }
      }
      throw new Error(error.response.data?.detail || error.message);
    }
    throw error;
  }
};

// Merge multiple PDF files
export const mergePdfs = async (files) => {
  if (!files || files.length < 2) {
    throw new Error("At least 2 PDF files are required");
  }

  const formData = new FormData();
  // FastAPI expects all files with the same field name "files"
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await apiClient.post("/merge-pdf", formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = `merged_${Date.now()}.pdf`;
    downloadFile(blob, filename);

    // Get latest conversion metadata
    try {
      const info = await apiClient.get("/conversion/latest");
      return info.data;
    } catch (err) {
      console.error("Could not fetch conversion info:", err);
      return null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.detail || "Merge failed");
        } catch {
          throw new Error("Server error occurred");
        }
      }
      throw new Error(error.response.data?.detail || error.message);
    }
    throw error;
  }
};

// Get latest conversion info
export const getLatestConversion = async () => {
  try {
    const response = await apiClient.get("/conversion/latest");
    return response.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return null; // No conversions yet
    }
    console.error("Could not fetch conversion info:", err);
    return null;
  }
};

// Compress PDF file
export const compressPdf = async (file, level = "extreme") => {
  if (!file || !file.name.endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(`/compress-pdf?level=${level}`, formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.pdf$/i, `_compressed_${level}.pdf`);
    downloadFile(blob, filename);

    // Get latest conversion metadata
    try {
      const info = await apiClient.get("/conversion/latest");
      return info.data;
    } catch (err) {
      console.error("Could not fetch conversion info:", err);
      return null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.detail || "Compression failed");
        } catch {
          throw new Error("Server error occurred");
        }
      }
      throw new Error(error.response.data?.detail || error.message);
    }
    throw error;
  }
};

// Convert PDF to Word
export const convertPdfToWord = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/convert/pdf-to-word", formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { 
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    });
    const filename = file.name.replace(/\.pdf$/i, ".docx");
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Convert PDF to Image
export const convertPdfToImage = async (file, format = "png") => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/convert/pdf-to-image?format=${format}`,
      formData,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: `image/${format}` });
    const filename = file.name.replace(/\.pdf$/i, `_page1.${format}`);
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Convert Image to PDF
export const convertImageToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/convert/image-to-pdf", formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.[^/.]+$/, ".pdf");
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Split PDF
export const splitPdf = async (file, startPage, endPage) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/split-pdf?start_page=${startPage}&end_page=${endPage}`,
      formData,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.pdf$/i, `_pages_${startPage}-${endPage}.pdf`);
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Rotate PDF
export const rotatePdf = async (file, angle) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/rotate-pdf?angle=${angle}`,
      formData,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.pdf$/i, `_rotated_${angle}.pdf`);
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Protect PDF
export const protectPdf = async (file, password) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/protect-pdf?password=${encodeURIComponent(password)}`,
      formData,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.pdf$/i, "_protected.pdf");
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Convert PDF to Text
export const convertPdfToText = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/convert/pdf-to-text", formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/plain" });
    const filename = file.name.replace(/\.pdf$/i, ".txt");
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Watermark PDF
export const watermarkPdf = async (file, watermarkText) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/watermark-pdf?watermark_text=${encodeURIComponent(watermarkText)}`,
      formData,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const filename = file.name.replace(/\.pdf$/i, "_watermarked.pdf");
    downloadFile(blob, filename);
    return await getLatestConversion();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Helper function for error handling
const handleApiError = (error) => {
  if (error.response?.data instanceof Blob) {
    error.response.data.text().then(text => {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.detail || "Operation failed");
      } catch {
        throw new Error("Server error occurred");
      }
    });
  }
};

// Get API info
export const getApiInfo = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (err) {
    console.error("Could not fetch API info:", err);
    return null;
  }
};
