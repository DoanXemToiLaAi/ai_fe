"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export default function ImageUploader({
  onUpload,
  isLoading,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    onUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    onUpload(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isLoading
            ? "opacity-50 pointer-events-none"
            : "hover:border-primary hover:bg-gray-50"
        }`}>
        {preview ? (
          <div className="relative mx-auto w-full max-w-xs">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="mx-auto max-h-48 object-contain"
            />
            <p className="mt-4 text-sm text-gray-500">
              {isLoading
                ? "Analyzing image..."
                : "Click or drag to upload a different image"}
            </p>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              {isLoading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
