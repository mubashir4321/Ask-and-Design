import React, { useState } from 'react';
import { FiUpload, FiDownload, FiPrinter, FiX, FiRefreshCw, FiLayers, FiImage, FiFileText } from 'react-icons/fi';
import '../styles/RebuildAnythingPage.css';

const RebuildAnythingPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [designTitle, setDesignTitle] = useState('Rebuilt Design');
  const [designSubject, setDesignSubject] = useState('Redesigned Project');
  const [designPrompt, setDesignPrompt] = useState('');
  const [exportFormat, setExportFormat] = useState('PNG');
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(720);
  const [versionHistory, setVersionHistory] = useState([
    { id: 1, version: 'v1.0', date: '2023-01-01', description: 'Initial upload' },
    { id: 2, version: 'v1.1', date: '2023-01-02', description: 'Color adjustments' }
  ]);
  const [currentView, setCurrentView] = useState('upload'); // 'upload', 'edit', 'preview'

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
      setFileName(file.name);
      setFileType(file.type.split('/')[1].toUpperCase());
      
      // Switch to edit view after upload
      setTimeout(() => setCurrentView('edit'), 300);
    }
  };

  const handleRebuild = () => {
    // Simulate rebuilding process
    const newVersion = {
      id: versionHistory.length + 1,
      version: `v${(versionHistory.length + 1)}.0`,
      date: new Date().toISOString().split('T')[0],
      description: 'Rebuilt design'
    };
    setVersionHistory([newVersion, ...versionHistory]);
    setCurrentView('preview');
  };

  const handleExport = () => {
    alert(`Exporting rebuilt design as ${exportFormat} with dimensions ${customWidth}x${customHeight}px`);
  };

  const handlePrint = () => {
    alert('Printing functionality would be implemented here');
  };

  const getFileIcon = (type) => {
    if (type.includes('image')) return <FiImage />;
    if (type.includes('pdf')) return <FiFileText />;
    if (type.includes('ppt') || type.includes('powerpoint')) return <FiLayers />;
    return <FiFileText />;
  };

  return (
    <div className="rebuild-anything-container">
      <div className="rebuild-header">
        <h2>Rebuild Anything</h2>
      </div>

      {currentView === 'upload' && (
        <div className="upload-section">
          <div className="upload-prompt">
            <div className="upload-icon">
              <FiUpload size={48} />
            </div>
            <h3>Upload Your Design</h3>
            <p>Upload an image, PDF, PPT, or any design file to rebuild and redesign it</p>
            
            <input
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.ppt,.pptx,.doc,.docx"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="upload-button">
              Select File
            </label>
            
            <p className="supported-formats">
              Supports: JPG, PNG, PDF, PPT, DOC, and more
            </p>
          </div>
        </div>
      )}

      {(currentView === 'edit' || currentView === 'preview') && uploadedFile && (
        <div className="rebuild-editor">
          <div className="editor-controls">
            <div className="control-group">
              <label>Title:</label>
              <input
                type="text"
                value={designTitle}
                onChange={(e) => setDesignTitle(e.target.value)}
                className="title-input"
              />
            </div>

            <div className="control-group">
              <label>Subject:</label>
              <input
                type="text"
                value={designSubject}
                onChange={(e) => setDesignSubject(e.target.value)}
                className="subject-input"
              />
            </div>

            <div className="control-group">
              <label>Prompt:</label>
              <textarea
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                className="prompt-textarea"
                placeholder="Enter your instructions for rebuilding this design..."
                rows="4"
              />
            </div>

            <div className="control-group">
              <label>Original File:</label>
              <div className="file-info">
                <div className="file-icon-type">
                  {getFileIcon(fileType.toLowerCase())}
                  <span>{fileName}</span>
                </div>
                <span className="file-type">{fileType}</span>
              </div>
            </div>

            <div className="control-group">
              <label>Export Settings:</label>
              <select 
                value={exportFormat} 
                onChange={(e) => setExportFormat(e.target.value)}
                className="format-select"
              >
                <option value="PNG">PNG</option>
                <option value="PDF">PDF</option>
                <option value="PPT">PPT</option>
              </select>
            </div>

            <div className="control-group">
              <label>Custom Size:</label>
              <div className="size-inputs">
                <div className="size-input-group">
                  <label>W:</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    min="100"
                    max="5000"
                    className="size-input"
                  />
                </div>
                <div className="size-input-group">
                  <label>H:</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Number(e.target.value))}
                    min="100"
                    max="5000"
                    className="size-input"
                  />
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="rebuild-btn" onClick={handleRebuild}>
                <FiRefreshCw /> Rebuild Design
              </button>
              <button className="export-btn" onClick={handleExport}>
                <FiDownload /> Export
              </button>
              <button className="print-btn" onClick={handlePrint}>
                <FiPrinter /> Print
              </button>
            </div>

            <div className="view-toggle">
              <button 
                className={`toggle-btn ${currentView === 'edit' ? 'active' : ''}`}
                onClick={() => setCurrentView('edit')}
              >
                Edit
              </button>
              <button 
                className={`toggle-btn ${currentView === 'preview' ? 'active' : ''}`}
                onClick={() => setCurrentView('preview')}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="editor-preview">
            <div className="preview-header">
              <h3>
                {currentView === 'edit' ? 'Edit Design' : 'Preview'}
              </h3>
              <div className="canvas-dimensions">
                {customWidth} × {customHeight}px
              </div>
            </div>
            
            <div className="preview-content">
              {currentView === 'edit' ? (
                <div className="edit-view">
                  <div className="original-preview">
                    <h4>Original Design</h4>
                    <div className="file-preview">
                      <img src={uploadedFile} alt="Original file" />
                    </div>
                  </div>
                  
                  <div className="editing-tools">
                    <h4>Editing Tools</h4>
                    <div className="tools-grid">
                      <button className="tool-btn">
                        <FiImage /> Change Colors
                      </button>
                      <button className="tool-btn">
                        <FiLayers /> Adjust Layout
                      </button>
                      <button className="tool-btn">
                        <FiFileText /> Modify Text
                      </button>
                      <button className="tool-btn">
                        <FiRefreshCw /> Auto Enhance
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preview-view">
                  <div className="rebuilt-preview">
                    <h4>Rebuilt Design Preview</h4>
                    <div 
                      className="rebuilt-canvas"
                      style={{ 
                        width: `${customWidth}px`, 
                        height: `${customHeight}px`,
                        backgroundImage: `url(${uploadedFile})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px'
                      }}
                    >
                      {/* This would show the rebuilt design */}
                      <div className="overlay">
                        <p>Rebuilt Design Preview</p>
                        <p>Version: {versionHistory[0]?.version || 'v1.0'}</p>
                      </div>
                    </div>
                    
                    <div className="preview-actions">
                      <button className="download-btn" onClick={handleExport}>
                        Download Rebuilt Version
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default RebuildAnythingPage;