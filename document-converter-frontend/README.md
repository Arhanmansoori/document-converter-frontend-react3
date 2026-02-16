# OneClickDoc - Frontend Setup Guide

> **Note:** This is the frontend documentation. For complete setup, see root `README.md`

## 📋 Prerequisites

Before running the frontend, make sure you have:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- Backend server running on `http://127.0.0.1:8000`

## 🚀 Quick Start

### Step 1: Navigate to Frontend Directory

Open your terminal/command prompt and navigate to the frontend directory:

```bash
cd frontend/document-converter-frontend
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- React
- React DOM
- Axios (for API calls)
- React Scripts (build tools)

### Step 3: Start Development Server

Start the React development server:

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to:
- **http://localhost:3000**

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode.
- Opens at `http://localhost:3000`
- Page reloads when you make changes
- Shows lint errors in the console

### `npm run build`
Builds the app for production to the `build` folder.
- Optimizes the build for best performance
- Ready for deployment

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: This is a one-way operation!**
Removes the single build dependency and copies all configuration files into your project.

## 📁 Project Structure

```
frontend/document-converter-frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── ...
├── src/
│   ├── components/         # React components
│   │   ├── ConverterCard.js
│   │   ├── WordToPdf.js
│   │   ├── HtmlToPdf.js
│   │   ├── ExcelToPdf.js
│   │   ├── PdfToImagePdf.js
│   │   └── MergePdf.js
│   ├── api.js              # API service functions
│   ├── App.js              # Main App component
│   ├── App.css             # Main styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### API Base URL

The frontend is configured to connect to the backend at:
- **Default**: `http://127.0.0.1:8000`

To change the API URL, edit `src/api.js`:

```javascript
const API_BASE = "http://your-backend-url:port";
```

## 🌐 Features

The OneClickDoc frontend provides:

1. **Word to PDF** - Convert .docx files to PDF
2. **HTML to PDF** - Convert HTML files to PDF
3. **Excel to PDF** - Convert .xlsx/.xls files to PDF
4. **PDF to Image PDF** - Convert PDF to image-based PDF
5. **Merge PDF** - Merge multiple PDF files into one

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, you'll see:
```
Something is already running on port 3000
```

**Solution**: 
- Press `Y` to run on a different port, or
- Stop the other process using port 3000

### Cannot Connect to Backend

If you see API errors:
1. Make sure the backend server is running
2. Check that backend is on `http://127.0.0.1:8000`
3. Verify CORS is enabled in backend (should be already configured)

### Module Not Found Errors

If you see module errors:
```bash
npm install
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Tips

1. **Hot Reload**: Changes to code automatically refresh the browser
2. **Console**: Check browser console (F12) for errors and logs
3. **Network Tab**: Use browser DevTools Network tab to debug API calls

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## 📞 Support

For issues or questions:
- Check the backend server logs
- Verify all dependencies are installed
- Ensure Node.js version is 14 or higher

---

**OneClickDoc** - Your Document Conversion Solution © 2024
