// import React, { useState } from "react";


// const Modal: React.FC = () => {
//     const [newModelName, setNewModelName] = useState("");


//     return (
//         <>
        
//         <div
//             style={{
//               background: "#fff",
//               padding: "20px",
//               borderRadius: "12px",
//               width: "400px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//               textAlign: "center",
//             }}
//           >
//             <h2 style={{ marginBottom: "15px" }}>Create a New Model</h2>
//             <input
//               type="text"
//               placeholder="Enter Model Name"
//               value={newModelName}
//               onChange={(e) => setNewModelName(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 marginBottom: "15px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />

//             <div
//               style={{
//                 border: "2px dashed #ccc",
//                 borderRadius: "12px",
//                 padding: "20px",
//                 textAlign: "center",
//                 marginBottom: "15px",
//               }}
//             >
//               <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
//                 Start from a photo
//               </p>
//               <label
//                 htmlFor="file-upload"
//                 style={{
//                   display: "inline-block",
//                   padding: "10px 20px",
//                   backgroundColor: "rgb(102,51,153)",
//                   color: "#fff",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   margin: "10px 0",
//                   fontSize: "1rem",
//                 }}
//               >
//                 📤 Browse files
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//               <p
//                 style={{ fontSize: "0.9rem", color: "#666" }}
//               >{`${uploadedImages.length} file(s) selected`}</p>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <button
//                 onClick={handleAddModel}
//                 style={{
//                   padding: "10px 20px",
//                   background: "green",
//                   color: "#fff",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Create
//               </button>
//               <button
//                 onClick={handleCloseModal}
//                 style={{
//                   padding: "10px 20px",
//                   background: "#f44336",
//                   color: "#fff",
//                   borderRadius: "8px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
        
        
//         </>
//     );
// };

// export default Modal;