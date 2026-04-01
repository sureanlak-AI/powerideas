import React, { useState, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { Button } from "./button";
import { X, Upload, Loader2, File, FileText, Download } from "lucide-react";
import { cn } from "../../lib/utils";

interface FileUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  acceptedTypes?: string[];
  storageFolder?: string;
  showPreview?: boolean;
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
  placeholder = "Seleccionar archivo",
  acceptedTypes = ["*/*"],
  storageFolder = "files",
  showPreview = true,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setFileName(file.name);
    setFileType(file.type);

    try {
      // Create a unique filename with timestamp
      const timestamp = Date.now();
      const filename = `${storageFolder}/${timestamp}_${file.name}`;
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
  }, [onChange, storageFolder]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleRemoveClick = useCallback(() => {
    setFileName(null);
    setFileType(null);
    onRemove?.();
  }, [onRemove]);

  const getFileIcon = (type: string) => {
    if (type?.startsWith('image/')) return File;
    if (type?.includes('pdf')) return FileText;
    if (type?.includes('document') || type?.includes('word')) return FileText;
    if (type?.includes('spreadsheet') || type?.includes('excel')) return FileText;
    return File;
  };

  const FileIcon = fileType ? getFileIcon(fileType) : File;

  return (
    <div className={cn("space-y-4", className)}>
      <input
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        disabled={disabled || isUploading}
      />

      {value && showPreview ? (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center space-x-3">
              <FileIcon className="h-8 w-8 text-gray-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileName || "Archivo subido"}
                </p>
                <p className="text-xs text-gray-500">
                  {fileType || "Tipo de archivo"}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => window.open(value, '_blank')}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Subiendo archivo...</p>
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
        <label
          htmlFor="file-upload"
          className={cn(
            "relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
          <p className="text-xs text-gray-500">
            Formatos soportados: {acceptedTypes.join(", ") || "Todos"}
          </p>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Subiendo archivo...</p>
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
        </label>
      )}

      {fileName && !isUploading && (
        <p className="text-sm text-gray-600 truncate">
          Archivo: {fileName}
        </p>
      )}
    </div>
  );
}

export default FileUpload; 