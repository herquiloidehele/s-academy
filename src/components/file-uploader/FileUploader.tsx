import React, { useEffect, useRef, useState } from "react";
import { XIcon } from "lucide-react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import VideoPlayer from "@/components/course/video-player/VideoPlayer";

function FileUploader({
  id,
  onFileChange,
  label = "Clique para fazer upload",
  instructions = "ou arraste e solte um arquivo",
  mimeType,
  fileTypes = "PDF, DOCX, PPTX",
  defaultFile,
  uploadedPercentage = 0, // default to 0 if not provided
  loading = false,
}) {
  const [file, setFile] = useState(defaultFile);
  const [progress, setProgress] = useState(0); // Manage upload progress
  const inputRef = useRef(null);

  useEffect(() => {
    setFile(defaultFile);
  }, [defaultFile]);

  useEffect(() => {
    setProgress(uploadedPercentage);
  }, [uploadedPercentage]);

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
    setFile(file);
    onFileChange(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
    onFileChange(null);
  };

  const isFileObject = (file) => file instanceof File;

  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {loading && mimeType.startsWith("video/") && progress > 0 && (
        <div className="w-full mt-2">
          <div className="relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="absolute h-full bg-primary"
              style={{ width: `${progress}%`, transition: "width 0.3s" }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-black font-semibold text-xs">
              {`${Math.round(progress)}%`}
            </span>
          </div>
        </div>
      )}
      {file ? (
        <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
          {mimeType.startsWith("image/") ? (
            <img
              src={isFileObject(file) ? URL.createObjectURL(file) : file}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : mimeType.startsWith("video/") ? (
            isFileObject(file) ? (
              <video controls src={URL.createObjectURL(file)} className="w-full h-full object-contain rounded-lg">
                Your browser does not support the video tag.
              </video>
            ) : (
              <VideoPlayer videoId={file} />
            )
          ) : (
            <a
              href={isFileObject(file) ? URL.createObjectURL(file) : file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-full h-full bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                <DocumentIcon className="h-16 w-16 text-blue-600" />
                <p className="text-sm text-blue-600 mt-2">{isFileObject(file) ? file.name : "Arquivo"}</p>
              </div>
            </a>
          )}
          <button onClick={handleRemoveFile} className="absolute top-2 right-2 rounded-full p-1 hover:bg-gray-200">
            <XIcon className="h-6 w-6 text-red-600" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`dropzone-file-${id}`}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          {
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
          }
          <input
            id={`dropzone-file-${id}`}
            type="file"
            accept={mimeType}
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                handleFileUpload(selectedFile);
              }
            }}
          />
        </label>
      )}
    </div>
  );
}

export default FileUploader;
