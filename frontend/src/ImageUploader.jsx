import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImageScanner = ({setScanId, setResult}) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    // Handle file selection (click and drop)
    const handleFileSelection = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    //Handle click to trigger file picker
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    //Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        handleFileSelection(file);
    };

    const handleDragOver = (e) => {
    e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFileSelection(file);
    };

    //Handle image submission
    const handleSubmit = async () => {
    if (!image) {
        alert('Please select an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
        const response = await axios.post('http://localhost:8000/scan', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setScanId(response.data.id)
        setResult(response.data)
    } catch (error) {
        console.error('Error scanning image:', error);
        alert('Failed to scan image.');
    }
  };
      return (
    <div style={styles.container}>
      <div
        style={styles.dropZone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={styles.previewImage} />
        ) : (
          <div style={styles.dropZoneText}>
            Drag & drop an image here or click to browse
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleSubmit} style={styles.submitButton}>
        Scan
      </button>
    </div>
  );
}


// Simple inline styles for demonstration
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  },
  dropZone: {
    width: '350px',
    height: '250px',
    border: '2px dashed #007bff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    overflow: 'hidden',
  },
  dropZoneText: {
    color: '#6c757d',
    padding: '20px',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  submitButton: {
    padding: '12px 30px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ImageScanner;



