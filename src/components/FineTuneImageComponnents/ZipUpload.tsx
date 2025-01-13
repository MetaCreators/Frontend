import React, { useState, useRef } from 'react';

interface ZipUploadProps {
  onUpload: (file: File) => void;
}

const ZipUpload: React.FC<ZipUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/zip') {
        setSelectedFile(file);
        onUpload(file);
      } else {
        alert('Please upload a valid ZIP file.');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/zip') {
        setSelectedFile(file);
        onUpload(file);
      } else {
        alert('Please upload a valid ZIP file.');
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onUpload(null as unknown as File);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input value to allow re-uploading
    }
  };

  const handleUploadToBackend = async () => {
    if (!selectedFile) {
      alert('No file selected to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await fetch('http://localhost:5000/upload-zip', { // Updated URL
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('File uploaded successfully: ' + data.filePath);
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Upload ZIP File</label>
      <div
        style={{
          width: '300px',
          height: '150px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          style={{
            opacity: 0,
            position: 'absolute',
            width: '300px',
            height: '150px',
            cursor: 'pointer',
          }}
        />
        <span style={{ fontSize: '16px', color: '#aaa' }}>Add ZIP File</span>
      </div>
      {selectedFile && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
          <p>{selectedFile.name}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={handleRemoveFile}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Remove File
            </button>
            <button
              onClick={handleUploadToBackend}
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Upload to Backend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZipUpload;
