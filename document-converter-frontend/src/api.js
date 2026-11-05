// AI assisted development
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api"
    : process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 300000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

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

const extractApiError = async (error, fallbackMessage) => {
  if (error.response?.data instanceof Blob) {
    const text = await error.response.data.text();
    try {
      const errorData = JSON.parse(text);
      return errorData.detail || fallbackMessage;
    } catch {
      return text || fallbackMessage;
    }
  }

  return error.response?.data?.detail || error.message || fallbackMessage;
};

const postForDownload = async (endpoint, formData, filename, mimeType, fallbackMessage) => {
  try {
    const response = await apiClient.post(endpoint, formData, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: mimeType });
    downloadFile(blob, filename);
    return null;
  } catch (error) {
    throw new Error(await extractApiError(error, fallbackMessage));
  }
};

export const checkBackendHealth = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (err) {
    console.error("Backend health check failed:", err);
    return null;
  }
};

export const convertFile = async (file, endpoint, outputExtension = ".pdf", mimeType = "application/pdf") => {
  const formData = new FormData();
  formData.append("file", file);

  const filename = file.name.replace(/\.[^/.]+$/, outputExtension);
  return postForDownload(endpoint, formData, filename, mimeType, "Conversion failed");
};

export const mergePdfs = async (files) => {
  if (!files || files.length < 2) {
    throw new Error("At least 2 PDF files are required");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return postForDownload(
    "/merge-pdf",
    formData,
    `merged_${Date.now()}.pdf`,
    "application/pdf",
    "Merge failed"
  );
};

export const compressPdf = async (file, level = "extreme") => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/compress-pdf?level=${encodeURIComponent(level)}`,
    formData,
    file.name.replace(/\.pdf$/i, `_compressed_${level}.pdf`),
    "application/pdf",
    "Compression failed"
  );
};

export const convertPdfToWord = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    "/convert/pdf-to-word",
    formData,
    file.name.replace(/\.pdf$/i, ".docx"),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "PDF to Word conversion failed"
  );
};

export const convertPdfToPowerPoint = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    "/convert/pdf-to-powerpoint",
    formData,
    file.name.replace(/\.pdf$/i, ".pptx"),
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "PDF to PowerPoint conversion failed"
  );
};

export const convertPdfToImage = async (file, format = "png") => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/convert/pdf-to-image?format=${encodeURIComponent(format)}`,
    formData,
    file.name.replace(/\.pdf$/i, `_page1.${format}`),
    `image/${format}`,
    "PDF to image conversion failed"
  );
};

export const convertImageToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    "/convert/image-to-pdf",
    formData,
    file.name.replace(/\.[^/.]+$/, ".pdf"),
    "application/pdf",
    "Image to PDF conversion failed"
  );
};

export const splitPdf = async (file, startPage, endPage) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/split-pdf?start_page=${startPage}&end_page=${endPage}`,
    formData,
    file.name.replace(/\.pdf$/i, `_pages_${startPage}-${endPage}.pdf`),
    "application/pdf",
    "Split failed"
  );
};

export const rotatePdf = async (file, angle) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/rotate-pdf?angle=${angle}`,
    formData,
    file.name.replace(/\.pdf$/i, `_rotated_${angle}.pdf`),
    "application/pdf",
    "Rotate failed"
  );
};

export const protectPdf = async (file, password) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/protect-pdf?password=${encodeURIComponent(password)}`,
    formData,
    file.name.replace(/\.pdf$/i, "_protected.pdf"),
    "application/pdf",
    "Protect PDF failed"
  );
};

export const convertPdfToText = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    "/convert/pdf-to-text",
    formData,
    file.name.replace(/\.pdf$/i, ".txt"),
    "text/plain",
    "PDF to text conversion failed"
  );
};

export const watermarkPdf = async (file, watermarkText) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    `/watermark-pdf?watermark_text=${encodeURIComponent(watermarkText)}`,
    formData,
    file.name.replace(/\.pdf$/i, "_watermarked.pdf"),
    "application/pdf",
    "Watermarking failed"
  );
};

export const translatePdf = async (file, targetLanguage, sourceLanguage = "auto") => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post(
      `/translate-pdf?target_language=${encodeURIComponent(targetLanguage)}&source_language=${encodeURIComponent(sourceLanguage)}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(await extractApiError(error, "Translation failed"));
  }
};

export const convertCsvToParquet = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return postForDownload(
    "/convert/csv-to-parquet",
    formData,
    file.name.replace(/\.csv$/i, ".parquet"),
    "application/octet-stream",
    "CSV to Parquet conversion failed"
  );
};

export const getApiInfo = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (err) {
    console.error("Could not fetch API info:", err);
    return null;
  }
};
