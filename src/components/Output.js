import React, { useState } from "react";
import axios from "axios";
import "./Output.css";
import Navbar1 from "./Navbar1";
import output from "./images/output.webp"; // Import your background image

const Home = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.result);
      setPercentage(response.data.percentage);
      setSelectedImage(URL.createObjectURL(file)); // Set selected image
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar1 />
      {/* Use inline styles to set the background image */}
      <div
        className="flex flex-col justify-center items-center h-screen main_container"
        style={{
          backgroundImage: `url(${output})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: '650px',
          padding: 0, // Remove padding
          margin: 0, // Remove margin
          marginTop:'-2rem',
        }}
      >
        <div className="mt-5">
          <h2 className="text-3xl font-bold mt-5" style={{fontFamily:'ui-monospace c '}}>Unlocking insights, predicting skin health futures</h2>
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="fw-bold"
            style={{
              marginTop: "-1rem",
            }}
          />
          {file && <p className="mt-1 fw-bold">Selected file: {file.name}</p>}
        </div>

        <div className="mb-2">
          <button
            onClick={handlePredict}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded fw-bold"
            disabled={loading}
            style={{
              marginTop: "-1rem",
              backgroundColor:'#2e1a1a',
            }}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* Display selected image */}
        {selectedImage && (
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-200 max-w-200"
              style={{ border: "2px solid black", maxWidth: "250px", maxHeight: "250px" }}
            />
          </div>
        )}

        <div>
          {result && (
            <div>
              <p className="text-xl fw-bold">Result: {result}</p>
              <p className="text-xl fw-bold text_percentage">Percentage: {percentage}%</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
