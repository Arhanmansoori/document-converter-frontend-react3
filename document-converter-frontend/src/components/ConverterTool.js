// Full-page converter tool reused across routes
import React, { useState } from "react";
import {
  convertFile,
  mergePdfs,
  compressPdf,
  convertPdfToWord,
  convertPdfToPowerPoint,
  convertImageToPdf,
  convertPdfToImage,
  splitPdf,
  rotatePdf,
  protectPdf,
  convertPdfToText,
  watermarkPdf,
  translatePdf,
  convertCsvToParquet,
} from "../api";
import {
  trackConversion,
  trackFileUpload,
  trackButtonClick,
} from "../utils/analytics";

const ConverterTool = ({
  type,
  icon,
  title,
  description,
  accept,
  endpoint,
  isMerge = false,
  isCompress = false,
  isSplit = false,
  isRotate = false,
  isProtect = false,
  isWatermark = false,
  isPdfToImage = false,
  isTranslate = false,
}) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [compressionLevel, setCompressionLevel] = useState("extreme");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [rotateAngle, setRotateAngle] = useState(90);
  const [password, setPassword] = useState("");
  const [watermarkText, setWatermarkText] = useState("");
  const [imageFormat, setImageFormat] = useState("png");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("English");

  const handleFileChange = (e) => {
    setTranslatedText("");

    if (isMerge) {
      const selectedFiles = Array.from(e.target.files);
      const pdfFiles = selectedFiles.filter((selectedFile) =>
        selectedFile.name.toLowerCase().endsWith(".pdf")
      );

      if (pdfFiles.length !== selectedFiles.length) {
        setMessage("Some files were skipped. Only PDF files are allowed.");
      } else {
        setMessage("");
      }

      if (pdfFiles.length < 2) {
        setMessage("Please select at least 2 PDF files.");
        setFiles([]);
        return;
      }

      setFiles(pdfFiles);
      pdfFiles.forEach((selectedFile) => {
        trackFileUpload("pdf", selectedFile.size);
      });
      return;
    }

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      trackFileUpload(selectedFile.name.split(".").pop(), selectedFile.size);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isMerge) {
      if (files.length < 2) {
        setMessage("Please select at least 2 PDF files.");
        return;
      }
    } else if (!file) {
      setMessage(isTranslate ? "Please select a PDF file first." : "Please select a file first.");
      return;
    }

    if (isSplit && (startPage < 1 || endPage < startPage)) {
      setMessage("Invalid page range.");
      return;
    }

    if (isProtect && (!password || password.length < 3)) {
      setMessage("Password must be at least 3 characters.");
      return;
    }

    if (isWatermark && (!watermarkText || !watermarkText.trim())) {
      setMessage("Please enter watermark text.");
      return;
    }

    if (isTranslate && (!targetLanguage || !targetLanguage.trim())) {
      setMessage("Please enter a target language.");
      return;
    }

    setLoading(true);
    setMessage("Processing, please wait...");
    setTranslatedText("");

    try {
      if (isMerge) {
        await mergePdfs(files);
        setMessage("Merge successful. File downloaded.");
        trackConversion("merge-pdf", files.map((selectedFile) => selectedFile.name).join(", "));
        setFiles([]);
      } else if (isCompress) {
        await compressPdf(file, compressionLevel);
        setMessage(`Compression successful. File downloaded (${compressionLevel} level).`);
        trackConversion("compress-pdf", file.name);
        setFile(null);
      } else if (type === "pdf-to-word") {
        await convertPdfToWord(file);
        setMessage("Conversion successful. File downloaded.");
        trackConversion("pdf-to-word", file.name);
        setFile(null);
      } else if (type === "pdf-to-powerpoint") {
        await convertPdfToPowerPoint(file);
        setMessage("PowerPoint presentation created. File downloaded.");
        trackConversion("pdf-to-powerpoint", file.name);
        setFile(null);
      } else if (type === "csv-to-parquet") {
        await convertCsvToParquet(file);
        setMessage("CSV to Parquet conversion successful. File downloaded.");
        trackConversion("csv-to-parquet", file.name);
        setFile(null);
      } else if (isTranslate || type === "translate-pdf") {
        const result = await translatePdf(file, targetLanguage, sourceLanguage);
        setTranslatedText(result.translated_text || "");
        setMessage(`Translation successful. Detected source: ${result.source_language}. Target: ${result.target_language}.`);
        trackConversion("translate-pdf", file.name);
      } else if (type === "image-to-pdf") {
        await convertImageToPdf(file);
        setMessage("Conversion successful. File downloaded.");
        trackConversion("image-to-pdf", file.name);
        setFile(null);
      } else if (isPdfToImage || type === "pdf-to-image") {
        await convertPdfToImage(file, imageFormat);
        setMessage(`Image extraction successful. File downloaded (${imageFormat.toUpperCase()}).`);
        trackConversion("pdf-to-image", file.name);
        setFile(null);
      } else if (isSplit) {
        await splitPdf(file, startPage, endPage);
        setMessage(`PDF split successful. Pages ${startPage}-${endPage} extracted.`);
        trackConversion("split-pdf", file.name);
        setFile(null);
      } else if (isRotate) {
        await rotatePdf(file, rotateAngle);
        setMessage(`PDF rotated successfully (${rotateAngle} degrees).`);
        trackConversion("rotate-pdf", file.name);
        setFile(null);
      } else if (isProtect) {
        await protectPdf(file, password);
        setMessage("PDF protected successfully. File downloaded.");
        trackConversion("protect-pdf", file.name);
        setFile(null);
        setPassword("");
      } else if (type === "pdf-to-text") {
        await convertPdfToText(file);
        setMessage("Text extraction successful. File downloaded.");
        trackConversion("pdf-to-text", file.name);
        setFile(null);
      } else if (isWatermark) {
        await watermarkPdf(file, watermarkText);
        setMessage("Watermark added successfully. File downloaded.");
        trackConversion("watermark-pdf", file.name);
        setFile(null);
        setWatermarkText("");
      } else {
        await convertFile(file, endpoint);
        setMessage("Conversion successful. File downloaded.");
        trackConversion(type, file.name);
        setFile(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (newFiles.length < 2) {
      setMessage("You need at least 2 files to merge.");
    } else {
      setMessage("");
    }
  };

  const isSubmitDisabled =
    (isMerge ? files.length < 2 : !file) ||
    loading ||
    (isSplit && (startPage < 1 || endPage < startPage)) ||
    (isProtect && (!password || password.length < 3)) ||
    (isWatermark && (!watermarkText || !watermarkText.trim())) ||
    (isTranslate && (!targetLanguage || !targetLanguage.trim()));

  const submitLabel = loading
    ? isMerge
      ? "Merging..."
      : isCompress
      ? "Compressing..."
      : isSplit
      ? "Splitting..."
      : isRotate
      ? "Rotating..."
      : isProtect
      ? "Protecting..."
      : isWatermark
      ? "Adding Watermark..."
      : isTranslate
      ? "Translating..."
      : type === "pdf-to-text"
      ? "Extracting..."
      : isPdfToImage || type === "pdf-to-image"
      ? "Extracting Image..."
      : type === "csv-to-parquet"
      ? "Converting CSV..."
      : "Converting..."
    : isMerge
    ? "Merge PDFs"
    : isCompress
    ? "Compress PDF"
    : isSplit
    ? "Split PDF"
    : isRotate
    ? "Rotate PDF"
    : isProtect
    ? "Protect PDF"
    : isWatermark
    ? "Add Watermark"
    : isTranslate
    ? "Translate PDF"
    : type === "pdf-to-text"
    ? "Extract Text"
    : isPdfToImage || type === "pdf-to-image"
    ? "Extract Image"
    : type === "csv-to-parquet"
    ? "Convert to Parquet"
    : "Convert";

  return (
    <div className="converter-page">
      <div className="converter-page-header">
        <button
          className="back-button"
          onClick={() => {
            trackButtonClick("Back to Home", title);
            window.location.href = "/";
          }}
        >
          Back to all tools
        </button>
        <h1>
          {icon} {title}
        </h1>
        <p>{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="converter-form">
        <div className="file-input-wrapper">
          <input
            type="file"
            id={`file-${type}`}
            accept={accept}
            multiple={isMerge}
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor={`file-${type}`} className="file-label">
            {isMerge
              ? "Choose PDF Files (Select 2 or more)"
              : file
              ? file.name
              : `Choose File (${accept})`}
          </label>
        </div>

        {isCompress && (
          <div className="compression-level-selector">
            <label htmlFor="compression-level">Compression Level:</label>
            <select
              id="compression-level"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
              className="compression-select"
            >
              <option value="extreme">Extreme (Smallest Size)</option>
              <option value="high">High (Good Balance)</option>
              <option value="medium">Medium (Better Quality)</option>
              <option value="low">Low (Best Quality)</option>
            </select>
          </div>
        )}

        {isSplit && file && (
          <div className="page-range-selector">
            <div className="form-group">
              <label htmlFor="start-page">Start Page:</label>
              <input
                type="number"
                id="start-page"
                min="1"
                value={startPage}
                onChange={(e) => setStartPage(parseInt(e.target.value, 10) || 1)}
                className="page-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-page">End Page:</label>
              <input
                type="number"
                id="end-page"
                min={startPage}
                value={endPage}
                onChange={(e) => setEndPage(parseInt(e.target.value, 10) || 1)}
                className="page-input"
              />
            </div>
          </div>
        )}

        {isRotate && (
          <div className="rotate-selector">
            <label htmlFor="rotate-angle">Rotation Angle:</label>
            <select
              id="rotate-angle"
              value={rotateAngle}
              onChange={(e) => setRotateAngle(parseInt(e.target.value, 10))}
              className="compression-select"
            >
              <option value={90}>90 degrees (Clockwise)</option>
              <option value={180}>180 degrees (Upside Down)</option>
              <option value={270}>270 degrees (Counter-clockwise)</option>
            </select>
          </div>
        )}

        {(isPdfToImage || type === "pdf-to-image") && (
          <div className="image-format-selector">
            <label htmlFor="image-format">Image Format:</label>
            <select
              id="image-format"
              value={imageFormat}
              onChange={(e) => setImageFormat(e.target.value)}
              className="compression-select"
            >
              <option value="png">PNG (Best Quality)</option>
              <option value="jpg">JPG (Smaller Size)</option>
              <option value="jpeg">JPEG (Smaller Size)</option>
            </select>
          </div>
        )}

        {isProtect && (
          <div className="password-input-group">
            <label htmlFor="pdf-password">Password:</label>
            <input
              type="password"
              id="pdf-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (min 3 characters)"
              className="password-input"
              required
            />
          </div>
        )}

        {isWatermark && (
          <div className="watermark-input-group">
            <label htmlFor="watermark-text">Watermark Text:</label>
            <input
              type="text"
              id="watermark-text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              placeholder="Enter watermark text"
              className="watermark-input"
              required
            />
          </div>
        )}

        {isTranslate && (
          <div className="page-range-selector">
            <div className="form-group">
              <label htmlFor="source-language">Source Language:</label>
              <input
                type="text"
                id="source-language"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value || "auto")}
                placeholder="auto"
                className="watermark-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="target-language">Target Language:</label>
              <input
                type="text"
                id="target-language"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                placeholder="English"
                className="watermark-input"
                required
              />
            </div>
          </div>
        )}

        {isMerge && files.length > 0 && (
          <div className="file-list">
            <h4>Selected Files ({files.length}):</h4>
            <ul>
              {files.map((selectedFile, index) => (
                <li key={`${selectedFile.name}-${index}`} className="file-item">
                  <span>{selectedFile.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" disabled={isSubmitDisabled} className="convert-button">
          {submitLabel}
        </button>
      </form>

      {message && (
        <div className={`message ${message.toLowerCase().includes("successful") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      {isTranslate && translatedText && (
        <div className="converter-form" style={{ marginTop: "1.5rem" }}>
          <h3>Translated Text</h3>
          <textarea
            readOnly
            value={translatedText}
            style={{ width: "100%", minHeight: "260px", padding: "1rem", resize: "vertical" }}
          />
        </div>
      )}
    </div>
  );
};

export default ConverterTool;
