import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImageScanner = ({setScanId, setResult}) => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);  // ← add this


    // Handle file selection (click and drop)
    const handleFileSelection = (files) => {
      for (const file of files) {
        if (file && file.type.startsWith('image/')) {
            setImages(prev => [...prev, file]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
      }
    };

    //Handle click to trigger file picker
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    //Handle file input change
    const handleFileChange = (e) => {
        handleFileSelection(Array.from(e.target.files));
    };

    const handleDragOver = (e) => {
    e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileSelection(Array.from(e.dataTransfer.files));
    };

    //Handle image submission
    const handleSubmit = async () => {
    if (images.length === 0) {
        alert('Please select an image first.');
        return;
    }

    const formData = new FormData();
    images.forEach(image => formData.append('files', image));

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
            <div style={styles.dropZone} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleButtonClick}>
                {previews.length > 0 ? (
                    <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {previews.map((src, i) => (
                            <img key={i} src={src} alt={`Preview ${i}`} style={{width: '80px', height: '80px', objectFit: 'cover'}} />
                        ))}
                    </div>
                ) : (
                    <div style={styles.dropZoneText}>Drag & drop up to 3 images here or click to browse</div>
                )}
                <input type="file" ref={fileInputRef} style={{display: 'none'}} accept="image/*" multiple onChange={handleFileChange} />
            </div>
            <button onClick={handleSubmit} style={styles.submitButton}>Scan</button>
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



