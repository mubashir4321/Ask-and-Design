import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiMaximize, FiSend, FiX } from 'react-icons/fi';
import IPDPDF from '../assets/pdfs/ipo.pdf';
import '../styles/AskAnythingPage.css';

const AskAnythingPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenData, setFullscreenData] = useState({ title: '', subject: '' });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() || files.length > 0) {
      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
        files: [...files]
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setFiles([]);
      setInputValue('');

      // Simulate AI response after a delay
      setTimeout(() => {
        let aiResponse;
        
        // Check if the question is about IPO
        const isIPOQuestion = inputValue.toLowerCase().includes('ipo') || inputValue.toLowerCase().includes('what is ipo');
        
        if (isIPOQuestion) {
          aiResponse = {
            id: messages.length + 2,
            text: 'Here is information about IPO:',
            sender: 'ai',
            timestamp: new Date(),
            pdf: IPDPDF
          };
        } else {
          aiResponse = {
            id: messages.length + 2,
            text: `I received your message: "${inputValue}". This is a simulated response.`,
            sender: 'ai',
            timestamp: new Date()
          };
        }
        
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const fileObjects = uploadedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setFiles(prev => [...prev, ...fileObjects]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    // Set default title and subject based on first message
    if (messages.length > 1) {
      const firstQuestion = messages.find(msg => msg.sender === 'user');
      setFullscreenData({
        title: firstQuestion ? firstQuestion.text.substring(0, 30) + '...' : 'Untitled Conversation',
        subject: 'General Discussion'
      });
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const updateFullscreenData = (field, value) => {
    setFullscreenData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderMessage = (message) => {
    return (
      <div key={message.id} className={`message ${message.sender}`}>
        <div className="message-content">
          {message.text && <p>{message.text}</p>}
          
          {message.pdf && (
            <div className="pdf-response">
              <a href={message.pdf} target="_blank" rel="noopener noreferrer" className="pdf-link">
                <div className="pdf-preview">
                  <div className="pdf-icon">📄</div>
                  <div className="pdf-info">
                    <div className="pdf-name">ipo.pdf</div>
                    <div className="pdf-desc">Click to view the IPO document</div>
                  </div>
                </div>
              </a>
            </div>
          )}
          
          {message.files && message.files.length > 0 && (
            <div className="message-files">
              {message.files.map(file => (
                <div key={file.id} className="file-preview">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="message-timestamp">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };

  return (
    <div className="ask-anything-container">
      <div className="chat-header">
        <h2>Ask Anything</h2>
        <button className="fullscreen-btn" onClick={openFullscreen}>
          <FiMaximize />
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-area">
        {files.length > 0 && (
          <div className="attached-files">
            {files.map(file => (
              <div key={file.id} className="file-attachment">
                <span className="file-name">{file.name}</span>
                <button className="remove-file-btn" onClick={() => removeFile(file.id)}>
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="input-row">
          <button 
            className="upload-btn" 
            onClick={() => fileInputRef.current?.click()}
            title="Upload files"
          >
            <FiPlus />
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            style={{ display: 'none' }}
          />
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="message-input"
          />
          
          <button 
            className="send-btn" 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && files.length === 0}
          >
            <FiSend />
          </button>
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-overlay">
          <div className="fullscreen-modal">
            <div className="modal-header">
              <h3>Edit Fullscreen View</h3>
              <button className="close-btn" onClick={closeFullscreen}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={fullscreenData.title}
                  onChange={(e) => updateFullscreenData('title', e.target.value)}
                  className="title-input"
                />
              </div>
              
              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  value={fullscreenData.subject}
                  onChange={(e) => updateFullscreenData('subject', e.target.value)}
                  className="subject-input"
                />
              </div>
              
              <div className="form-group">
                <label>Upload/Edit Image:</label>
                <div className="image-upload-section">
                  <button 
                    className="upload-image-btn" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
              
              <div className="preview-section">
                <h4>Conversation Preview:</h4>
                <div className="preview-messages">
                  {messages.slice(-3).map(renderMessage)}
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeFullscreen}>Cancel</button>
              <button className="save-btn">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskAnythingPage;