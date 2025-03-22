
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResumeUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      handleFile(uploadedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      handleFile(uploadedFile);
    }
  };

  const handleFile = (uploadedFile: File) => {
    // Check if it's a valid file type (PDF, DOCX, etc.)
    const validFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validFileTypes.includes(uploadedFile.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }
    
    setFile(uploadedFile);
    onFileUpload(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ease-in-out",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700",
          file ? "bg-secondary/30" : "bg-background hover:bg-secondary/30"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {file ? (
            <div className="animate-fade-in">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <h3 className="text-lg font-medium">Resume Uploaded</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">{file.name}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={removeFile}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
                <Button 
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={isLoading || !file}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Drag and drop your resume file (PDF or DOCX) or click to browse
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-2"
                disabled={isLoading}
              >
                Select File
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
