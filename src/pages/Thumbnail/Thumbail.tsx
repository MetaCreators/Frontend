import React, { useState, useEffect } from "react";
import mtn from "../../assets/mtn.jpg";
import Imageslider from "../../components/ThumbnailPageComponents/ImageComparisonSlider";
import JSZip from "jszip";

interface Model {
  name: string;
  images: string[];
}

const ThumbnailPage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [inputText1, setInputText1] = useState<string>("");
  const [inputText2, setInputText2] = useState<string>("");
  const [inputText3, setInputText3] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string>(mtn);
  const [uploaded_image, setuploaded_image] = useState<string>("");
  const [image_uploaded_identifier, setimage_uploaded_identifier] =
    useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewModelName("");
    setUploadedImages([]);
  };

  const handleAddModel = async () => {
    if (newModelName.trim() && uploadedImages.length > 0) {
      const imageUrls = uploadedImages.map((file) => URL.createObjectURL(file));
      setModels([...models, { name: newModelName, images: imageUrls }]);
      const zip = new JSZip();
      uploadedImages.forEach((file) => {
        zip.file(file.name, file);
      });

      try {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const formData = new FormData();
        formData.append("file", new File([zipBlob], "images.zip"));
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Zip file uploaded successfully!");
        } else {
          alert("Failed to upload the zip file.");
        }
      } catch (error) {
        console.error("Error uploading zip file:", error);
        alert("An error occurred while uploading the zip file.");
      }
    } else {
      alert("Please provide a model name and upload at least one image.");
    }
    handleCloseModal();
  };

  const handleGenerateImage = () => {
    if (inputText1 === "" || inputText2 === "" || inputText3 === "") {
      alert("Enter the input Fields");
    } else {
      setGeneratedImage(mtn);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setUploadedImages(filesArray);
      const uploadedImg = URL.createObjectURL(event.target.files[0]);
      setuploaded_image(uploadedImg);
      setimage_uploaded_identifier(true);
    }
  };

  useEffect(() => {
    console.log(uploadedImages, "uploaded images Array");
  }, [uploadedImages]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            width: "100%",
          }}
        >
          <div style={{ flex: 1, textAlign: "left" }}>
            <h1
              style={{
                fontSize: "3.0rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Generate Thumbnail
            </h1>
            <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.5" }}>
              Dream it up, then add it to your design. Watch your words and
              phrases transform into beautiful images with the best AI image
              generators available at your fingertips. Stand out with an image
              perfect for your project.
            </p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "300px",
                }}
              >
                <input
                  type="text"
                  placeholder="Text 1 "
                  value={inputText1}
                  onChange={(e) => setInputText1(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
                <div style={{ height: "3px" }} />
                <input
                  type="text"
                  placeholder="Text 2 "
                  value={inputText2}
                  onChange={(e) => setInputText2(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
                <div style={{ height: "3px" }} />
                <input
                  type="text"
                  placeholder="Text 3"
                  value={inputText3}
                  onChange={(e) => setInputText3(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>
              <button
                onClick={handleGenerateImage}
                style={{
                  padding: "10px 20px",
                  background: "rgb(102,51,153)",
                  color: "#fff",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Generate
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {image_uploaded_identifier ? (
              <Imageslider defaultImage={mtn} generatedImage={uploaded_image} />
            ) : (
              <img
                src={generatedImage}
                alt="Generated"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            )}
            <button
              onClick={handleOpenModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "rgb(102,51,153)",
                color: "#fff",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create New Model
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {models.map((model, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#f5f5f5",
                width: "auto",
              }}
            >
              <h3>{model.name}</h3>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>Create a New Model</h2>
            <input
              type="text"
              placeholder="Enter Model Name"
              value={newModelName}
              onChange={(e) => setNewModelName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div
              style={{
                border: "2px dashed #ccc",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Start from a photo
              </p>
              <label
                htmlFor="file-upload"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "rgb(102,51,153)",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "10px 0",
                  fontSize: "1rem",
                }}
              >
                📤 Browse files
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <p
                style={{ fontSize: "0.9rem", color: "#666" }}
              >{`${uploadedImages.length} file(s) selected`}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleAddModel}
                style={{
                  padding: "10px 20px",
                  background: "green",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Create
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px 20px",
                  background: "#f44336",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThumbailPage;