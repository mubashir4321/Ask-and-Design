import React, { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiPrinter, FiX, FiEye, FiEdit, FiPlus, FiMinus, FiSend } from 'react-icons/fi';
import MobileAppPoster from '../assets/images/app-develoment-poster.jpeg';
import '../styles/MakeDesignPage.css';

const MakeDesignPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isDesignGenerated, setIsDesignGenerated] = useState(false);
  const [designTitle, setDesignTitle] = useState('My New Design');
  const [designSubject, setDesignSubject] = useState('Creative Project');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [designPreview, setDesignPreview] = useState(null);
  const [exportFormat, setExportFormat] = useState('PNG');
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(720);
  const [activeTab, setActiveTab] = useState('design'); // 'design' or 'preview'
  const [designElements, setDesignElements] = useState([
    { id: 1, type: 'text', content: 'Your Creative Idea', x: 50, y: 50, fontSize: 24, color: '#ffffff' },
    { id: 2, type: 'shape', shape: 'rectangle', x: 100, y: 150, width: 200, height: 100, color: '#10a37f' }
  ]);
  const [showRefinePrompt, setShowRefinePrompt] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const fileInputRef = useRef(null);

  const handlePromptSubmit = () => {
    if (prompt.trim()) {
      // Generate design based on prompt
      const lowerPrompt = prompt.toLowerCase();

      // Set title and subject based on prompt
      setDesignTitle(prompt.charAt(0).toUpperCase() + prompt.slice(1));
      setDesignSubject('Generated from prompt');

      // Generate design elements based on prompt keywords
      if (lowerPrompt.includes('mobile app') || lowerPrompt.includes('app development')) {
        // Show the mobile app poster image instead of text elements
        setUploadedImage(MobileAppPoster);
        setDesignElements([]); // Clear design elements to show only the image
        setCustomWidth(400);
        setCustomHeight(600);
      } else {
        // Default design for other prompts
        setDesignElements([
          { id: 1, type: 'text', content: prompt, x: 100, y: 100, fontSize: 36, color: '#ffffff' },
          { id: 2, type: 'text', content: 'Creative Design', x: 100, y: 200, fontSize: 24, color: '#10a37f' }
        ]);
      }

      setIsDesignGenerated(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const handleNewDesign = () => {
    setIsDesignGenerated(false);
    setPrompt('');
    setUploadedImage(null);
    setShowRefinePrompt(false);
    setRefinePrompt('');
  };

  const handleRefineDesign = () => {
    if (refinePrompt.trim()) {
      // Apply refinements based on the new prompt
      const lowerPrompt = refinePrompt.toLowerCase();
      
      if (lowerPrompt.includes('add text')) {
        addDesignElement('text');
      } else if (lowerPrompt.includes('change') || lowerPrompt.includes('update')) {
        // Update title or subject based on prompt
        setDesignSubject(refinePrompt);
      } else {
        // Add new text element with the prompt content
        setDesignElements((prevElements) => [
          ...prevElements,
          {
            id: prevElements.length + 1000,
            type: 'text',
            content: refinePrompt,
            x: 100 + (prevElements.length * 20),
            y: 100 + (prevElements.length * 30),
            fontSize: 20,
            color: '#ffffff'
          }
        ]);
      }
      
      setRefinePrompt('');
      setShowRefinePrompt(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    alert(`Exporting design as ${exportFormat} with dimensions ${customWidth}x${customHeight}px`);
    // In a real app, this would trigger actual export functionality
  };

  const handlePrint = () => {
    alert('Printing functionality would be implemented here');
    // In a real app, this would trigger print functionality
  };

  const addDesignElement = (type) => {
    const newElement = {
      id: Date.now(),
      type: type,
      content: type === 'text' ? 'New Element' : '',
      x: 100,
      y: 100,
      fontSize: 16,
      color: type === 'text' ? '#ffffff' : '#10a37f'
    };
    setDesignElements([...designElements, newElement]);
  };

  const updateDesignElement = (id, updates) => {
    setDesignElements(elements =>
      elements.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };

  const removeDesignElement = (id) => {
    setDesignElements(elements => elements.filter(el => el.id !== id));
  };

  return (
    <div className="make-design-container">
      <div className="design-header">
        <h2>Make Design</h2>
        {isDesignGenerated && (
          <div className="header-buttons">
            <button className="refine-design-btn" onClick={() => setShowRefinePrompt(!showRefinePrompt)}>
              <FiEdit /> Refine Design
            </button>
            <button className="new-design-btn" onClick={handleNewDesign}>
              <FiPlus /> New Design
            </button>
          </div>
        )}
      </div>

      {!isDesignGenerated ? (
        <div className="prompt-section">
          <div className="prompt-prompt">
            <div className="prompt-icon">
              <FiEdit size={48} />
            </div>
            <h3>Describe Your Design</h3>
            <p>Enter a prompt to generate a custom design (e.g., "Make a mobile app development poster")</p>

            <div className="prompt-input-area">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the design you want to create..."
                className="prompt-input"
                rows={4}
              />

              <button
                className="generate-btn"
                onClick={handlePromptSubmit}
                disabled={!prompt.trim()}
              >
                <FiSend /> Generate Design
              </button>
            </div>

            <div className="prompt-examples">
              <h4>Example prompts:</h4>
              <div className="example-chips">
                <button onClick={() => setPrompt('Make a mobile app development poster')}>
                  Mobile app poster
                </button>
                <button onClick={() => setPrompt('Create a business presentation slide')}>
                  Business presentation
                </button>
                <button onClick={() => setPrompt('Design a social media banner')}>
                  Social media banner
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="design-tabs">
        <button 
          className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          <FiEdit /> Design
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <FiEye /> Preview
        </button>
      </div>

      {showRefinePrompt && (
        <div className="refine-prompt-section">
          <h4>Refine Your Design</h4>
          <div className="refine-input-area">
            <textarea
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleRefineDesign();
                }
              }}
              placeholder="Enter changes you want to make (e.g., 'Add text Welcome to our app')"
              className="refine-input"
              rows={3}
            />
            <div className="refine-buttons">
              <button
                className="apply-refine-btn"
                onClick={handleRefineDesign}
                disabled={!refinePrompt.trim()}
              >
                <FiSend /> Apply Changes
              </button>
              <button
                className="cancel-refine-btn"
                onClick={() => {
                  setShowRefinePrompt(false);
                  setRefinePrompt('');
                }}
              >
                <FiX /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'design' && (
        <div className="design-editor">
          <div className="design-controls">
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
              <label>Upload Background Image:</label>
              <div className="upload-section">
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <label htmlFor="image-upload" className="upload-label">
                  <FiUpload /> Choose Image
                </label>
                {uploadedImage && (
                  <button 
                    className="remove-image-btn" 
                    onClick={() => setUploadedImage(null)}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>

            <div className="control-group">
              <label>Add Elements:</label>
              <div className="element-buttons">
                <button className="element-btn" onClick={() => addDesignElement('text')}>
                  Add Text
                </button>
                <button className="element-btn" onClick={() => addDesignElement('shape')}>
                  Add Shape
                </button>
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
              <button className="export-btn" onClick={handleExport}>
                <FiDownload /> Export
              </button>
              <button className="print-btn" onClick={handlePrint}>
                <FiPrinter /> Print
              </button>
            </div>
          </div>

          <div className="design-canvas">
            <div className="canvas-header">
              <h3>Design Canvas</h3>
              <div className="canvas-dimensions">
                {customWidth} × {customHeight}px
              </div>
            </div>
            
            <div 
              className="canvas-area"
              style={{ 
                width: `${customWidth}px`, 
                height: `${customHeight}px`,
                backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {designElements.map(element => (
                <div
                  key={element.id}
                  className="design-element"
                  style={{
                    position: 'absolute',
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    color: element.color,
                    fontSize: `${element.fontSize}px`,
                  }}
                  onDoubleClick={() => {
                    const newText = prompt('Edit text:', element.content);
                    if (newText !== null) {
                      updateDesignElement(element.id, { content: newText });
                    }
                  }}
                >
                  {element.type === 'text' && element.content}
                  {element.type === 'shape' && (
                    <div 
                      style={{ 
                        width: `${element.width || 100}px`, 
                        height: `${element.height || 100}px`, 
                        backgroundColor: element.color,
                        borderRadius: element.shape === 'circle' ? '50%' : '0'
                      }}
                    />
                  )}
                  <button 
                    className="remove-element-btn"
                    onClick={() => removeDesignElement(element.id)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="design-preview">
          <div className="preview-header">
            <h3>Design Preview</h3>
          </div>
          
          <div className="preview-content">
            <div className="preview-info">
              <h4>{designTitle}</h4>
              <p>{designSubject}</p>
            </div>
            
            <div 
              className="preview-canvas"
              style={{ 
                width: '100%', 
                maxWidth: `${customWidth}px`, 
                height: '400px',
                backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              {designElements.map(element => (
                <div
                  key={element.id}
                  style={{
                    position: 'absolute',
                    left: `${Math.min(element.x, 90)}%`, // Constrain to percentage
                    top: `${Math.min(element.y, 80)}%`, // Constrain to percentage
                    color: element.color,
                    fontSize: `${element.fontSize}px`,
                  }}
                >
                  {element.type === 'text' && element.content}
                  {element.type === 'shape' && (
                    <div 
                      style={{ 
                        width: `${Math.min(element.width || 50, 100)}px`, 
                        height: `${Math.min(element.height || 50, 100)}px`, 
                        backgroundColor: element.color,
                        borderRadius: element.shape === 'circle' ? '50%' : '0'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="preview-actions">
              <button className="export-btn" onClick={handleExport}>
                <FiDownload /> Export Design
              </button>
              <button className="print-btn" onClick={handlePrint}>
                <FiPrinter /> Print
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default MakeDesignPage;