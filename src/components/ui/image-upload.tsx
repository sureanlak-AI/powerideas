import React, { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { useImageUpload } from "../../hooks/use-image-upload";
import { Button } from "./button";
import { X, Upload, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  acceptedTypes?: string[];
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
  placeholder = "Seleccionar imagen",
  acceptedTypes = ["image/*"],
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFirebaseUpload = useCallback(async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique filename with timestamp
      const timestamp = Date.now();
      const filename = `images/${timestamp}_${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Call onChange with the Firebase URL
      onChange?.(downloadURL);
      
      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading file:", error);
      // You might want to show a toast notification here
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onChange]);

  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove: handleLocalRemove,
  } = useImageUpload({
    onUpload: async (localUrl) => {
      // Get the actual file from the input
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        await handleFirebaseUpload(file);
      }
    },
  });

  const handleRemoveClick = useCallback(() => {
    handleLocalRemove();
    onRemove?.();
  }, [handleLocalRemove, onRemove]);

  const displayUrl = value || previewUrl;

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {displayUrl ? (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img
              src={displayUrl}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Subiendo imagen...</p>
                  {uploadProgress > 0 && (
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveClick}
            disabled={disabled || isUploading}
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleThumbnailClick}
          className={cn(
            "relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
          <p className="text-xs text-gray-500">
            Formatos: JPG, PNG, GIF (máx. 5MB)
          </p>
        </div>
      )}

      {fileName && !isUploading && (
        <p className="text-sm text-gray-600 truncate">
          Archivo: {fileName}
        </p>
      )}
    </div>
  );
}

export default ImageUpload; 