import React, { useState, useEffect } from "react";
import mtn from "../../assets/mtn.jpg";
import Imageslider from "../../components/ThumbnailPageComponents/ImageComparisonSlider";
import JSZip from "jszip";
import Modalcontainer from "@/components/ThumbnailPageComponents/Modalcontainer";
import useCounterStore from "../../store/counterstore";
import { Button } from "@/components/ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface Model {
  name: string;
  images: string[];
}

const ThumbnailPage: React.FC = () => {
  const bucket = "lithouseuserimages";
  const [models, setModels] = useState<Model[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [inputText1, setInputText1] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string>(mtn);
  const [uploaded_image, setuploaded_image] = useState<string>("");
  const [image_uploaded_identifier, setimage_uploaded_identifier] =
    useState(false);
  const [image_urls, setimage_urls] = useState<string[]>([]);
  const { image_coming_from_BE, image_to_show_in_modal_list } =
    useCounterStore();
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewModelName("");
    setUploadedImages([]);
  };

  const handleAddModel = async () => {
    if (newModelName.trim() && uploadedImages.length >= 15) {
      const imageUrls = uploadedImages.map((file) => URL.createObjectURL(file));

      console.log(imageUrls, "imageURLs");
      setimage_urls(imageUrls);
      image_to_show_in_modal_list(imageUrls[0]);

      setModels([...models, { name: newModelName, images: imageUrls }]);
      const zip = new JSZip();
      uploadedImages.forEach((file) => {
        zip.file(file.name, file);
      });

      // if(uploadedImages.length>=15)
      try {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const formData = new FormData();
        formData.append("file", new File([zipBlob], "images.zip"));
        const userId = "training1"; // TODO: Make this dynamic
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL +
            `/api/get-presignedurl-upload?userId=${userId}`,
          {
            method: "GET",
          }
        );
        const key = `${userId}/generatedImages/${Date.now()}.zip`;
        const data = await response.json();
        const s3Params = {
          Bucket: bucket,
          Key: key,
          ContentType: "application/zip",
        };

        console.log("presigned url from backend is", data.presignedUrl);
        const uploading = await fetch(data.presignedUrl, {
          method: "PUT",
          body: zipBlob,
          headers: {
            "Content-Type": s3Params.ContentType,
          },
        });
        console.log("Image saving to DO status", uploading);
        // if (response.ok) {
        //   alert("Zip file uploaded successfully!");
        // } else {
        //   alert("Failed to upload the zip file.");
        // }
      } catch (error) {
        console.error("Error uploading zip file:", error);
        alert("An error occurred while uploading the zip file.");
      }
    } else {
      alert("Please provide a model name and upload at least 15 image.");
    }
    handleCloseModal();
    setimage_uploaded_identifier(true);
  };

  const handleGenerateImage = async () => {
    //TODO: fix the before after slider here
    if (inputText1 === "") {
      alert("Enter the input Fields");
    } else {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Not authenticated");
      }
      console.log("user session access token", session.access_token);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/genpersonimage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            userQuery: "Shikhar",
            userId: "01f90e3d-171d-4313-8985-f25ccd5cd915",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          "response not ok for script gen " + data.message ||
            "Failed to generate script"
        );
      }
      const url = data.urls[0];

      setGeneratedImage(url);
      setLoading(false);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let files: File[];
    if ("dataTransfer" in event) {
      files = Array.from(event.dataTransfer.files);
    } else if (event.target.files) {
      files = Array.from(event.target.files);
    } else {
      return;
    }
    setUploadedImages(files);
    if (files.length > 0) {
      const uploadedImg = URL.createObjectURL(files[0]);
      setuploaded_image(uploadedImg);
    }
  };

  useEffect(() => {
    console.log(uploadedImages, "uploaded images Array");

    let timeoutId: ReturnType<typeof setTimeout>;
    if (image_uploaded_identifier) {
      timeoutId = setTimeout(() => {
        setimage_uploaded_identifier(true);
      }, 4000);
    }
  }, [image_uploaded_identifier]);

  return (
    <>
      <Navbar />
      <div className="max-h-screen flex justify-center items-center py-14">
        <div
          className="flex flex-col items-center justify-center px-10 pt-1 w-full"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <Breadcrumb className="w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Image fine tune</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div
            className="space-x-9"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              className="flex flex-col justify-between h-full w-full"
              style={{ flex: 1, textAlign: "left" }}
            >
              <h1
                style={{
                  fontSize: "4.0rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Generate Thumbnail
              </h1>
              <p
                style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.0" }}
              >
                Dream it up, then add it to your design. Watch your words and
                phrases transform into beautiful images with the best AI image
                generators available at your fingertips. Stand out with an image
                perfect for your project.
              </p>
              <div className="mt-5 flex items-center justify-between gap-3 w-full">
                <div className="relative w-3/4">
                  <SearchIcon
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Type in your idea here and see the magic"
                    value={inputText1}
                    onChange={(e) => setInputText1(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 10px 10px 40px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <Button
                  onClick={handleGenerateImage}
                  className="bg-purple-600 hover:bg-purple-800 w-1/4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate AI Images"
                  )}
                </Button>
              </div>
            </div>

            {/* right side wala */}
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
                <Imageslider
                  defaultImage={mtn}
                  generatedImage={uploaded_image}
                />
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

              <Modalcontainer triggerFunction={handleOpenModal} />

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* <Modalcontainer /> */}

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
            onClick={handleCloseModal} // 🔴 This closes modal on clicking backdrop
          >
            <div
              onClick={(e) => e.stopPropagation()} // 🟢 Prevents modal from closing on clicking inside
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                width: "400px",
                boxShadow: "0px 4px 10px rgba(46, 43, 43, 0.2)",
                textAlign: "center",
                position: "relative", // For positioning the close button relative to the modal
              }}
            >
              <button
                className="border border-purple-600 text-purple-600"
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "-10px", // Slightly above the modal
                  right: "-10px", // Slightly outside the modal's right edge
                  background: "#fff",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                X
              </button>
              {/* 🔲 Dashed Border for Inputs and Create Button */}
              <input
                type="text"
                placeholder="What do you want to call this new model?"
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
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#9333ea";
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#ccc";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = "#ccc";
                  const files = Array.from(e.dataTransfer.files);
                  setUploadedImages(files);
                }}
              >
                {/* 📤 File Upload */}
                <label
                  className="bg-fuchsia-700"
                  htmlFor="file-upload"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    color: "#fff",
                    borderRadius: "50px",
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
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    marginTop: "10px",
                  }}
                >
                  or drag and drop files here
                </p>
              </div>
              <Button
                onClick={handleAddModel}
                className="w-full bg-purple-600 hover:bg-purple-800"
              >
                Create
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThumbnailPage;
