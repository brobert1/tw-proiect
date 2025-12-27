import { useFormContext } from 'react-hook-form';
import { useCallback, useState, useMemo } from 'react';
import { Upload, FileText, X, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { classnames } from '@lib';

const PaperUpload = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const file = watch('file');
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  // Create object URL for PDF preview
  const fileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === 'application/pdf') {
        setValue('file', droppedFile);
      }
    },
    [setValue]
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValue('file', selectedFile);
    }
  };

  const removeFile = () => {
    setValue('file', null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Upload Your Paper</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload your paper as a PDF file. Maximum file size is 10MB.
        </p>
      </div>
      {errors.file && <p className="text-sm text-red-600">{errors.file.message}</p>}
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={classnames(
            'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          )}
        >
          <Upload
            className={classnames('h-12 w-12', isDragging ? 'text-blue-500' : 'text-gray-400')}
          />
          <p className="mt-4 text-sm font-medium text-gray-700">Drag and drop your PDF here, or</p>
          <label className="mt-2 cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Browse files
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
          <p className="mt-3 text-xs text-gray-500">PDF files only, up to 10MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                  title={showPreview ? 'Hide preview' : 'Show preview'}
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          {showPreview && fileUrl && (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <iframe src={fileUrl} title="PDF Preview" className="h-64 w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaperUpload;
