import React, { useState } from 'react';



const ThumbailPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('Vibrant');
  const [generatedImage, setGeneratedImage] = useState<string>('/path-to-default-image.jpg'); // Default image placeholder

  const styles = ['Photo', 'Vibrant', 'Concept', 'Dreamy', 'More'];

  const handleGenerateImage = () => {
    // Mock image generation
    alert(`Generating image for "${inputText}" with style "${selectedStyle}"`);
    setGeneratedImage('./src/assets/mtn.jpg'); // Replace with actual image path from API
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Left Section */}
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Free Online AI Image Generator</h1>
        <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.5' }}>
          Dream it up, then add it to your design. Watch your words and phrases transform into beautiful images with the
          best AI image generators available at your fingertips. Stand out with an image perfect for your project.
        </p>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Input Field */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Enter your idea..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
            {inputText && (
              <button
                onClick={() => setInputText('')}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ❌
              </button>
            )}
          </div>
          {/* Generate Button */}
          <button
            onClick={handleGenerateImage}
            style={{
              padding: '10px 20px',
              background: '#6C63FF',
              color: '#fff',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Generate AI Images
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Generated Image */}
        <img
          src={generatedImage}
          alt="Generated"
          style={{
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        {/* Style Selector */}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              style={{
                padding: '5px 15px',
                background: style === selectedStyle ? '#6C63FF' : '#fff',
                color: style === selectedStyle ? '#fff' : '#000',
                border: '1px solid #ccc',
                borderRadius: '20px',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbailPage;
