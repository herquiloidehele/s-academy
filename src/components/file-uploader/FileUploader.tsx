import React, { useRef, useState } from "react";
import { Loader2Icon, XIcon } from "lucide-react";

function FileUploader({
  onFileChange,
  label = "Clique para fazer upload",
  instructions = "ou arraste e solte um arquivo",
  fileTypes = "SVG, PNG, JPG or MP4 (MAX. 800x400px)",
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    setLoading(true);
    setFile(file);
    onFileChange(file);
    setLoading(false); // Simulating the end of the upload process
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
    onFileChange(null);
  };

  const fileUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="flex items-center justify-center w-full" onDragOver={handleDragOver} onDrop={handleDrop}>
      {file ? (
        <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
          {file.type.startsWith("image/") ? (
            <img src={fileUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          ) : file.type.startsWith("video/") ? (
            <video controls src={fileUrl} className="w-full h-full object-cover rounded-lg">
              Your browser does not support the video tag.
            </video>
          ) : null}
          <button onClick={handleRemoveFile} className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-200">
            <XIcon className="h-6 w-6 text-red-600" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="loader"></div> {/* Replace with a spinner or animation */}
              <p className="text-sm flex flex-grow gap-2 text-gray-500 dark:text-gray-400">
                <Loader2Icon className="animate-spin" />
                Uploading...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{label}</span> {instructions}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{fileTypes}</p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
}

export default FileUploader;
