import React, { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function FileUploader({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      if (onFileSelect) onFileSelect(selectedFile);
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {/* درگ اند دراپ */}
      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          bgcolor: isDragging ? "primary.light" : "grey.100",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          width: "100%",
          maxWidth: 400,
          transition: "0.3s",
          "&:hover": { bgcolor: "grey.200" },
        }}
      >
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <CloudArrowUpIcon className="w-12 h-12 text-gold mx-auto mb-2" />
          <Typography variant="body1" color="text.secondary">
            {file ? `📂 ${file.name}` : "برای آپلود تصویر کلیک کنید یا اینجا بکشید"}
          </Typography>
        </label>
      </Box>

      {/* نمایش تصویر */}
      {file && (
        <Box mt={2} textAlign="center">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {file.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
