import { uploadFinalVersion } from '@api/author';
import { useMutation } from '@hooks';
import { FileText, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

const UploadFinalSection = ({ paperId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const mutation = useMutation((selectedFile) => uploadFinalVersion(paperId, selectedFile), {
    invalidateQueries: ['/author/conferences'],
    successCallback: () => {
      setFile(null);
      setPreviewUrl(null);
      onSuccess?.();
    },
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setPreviewUrl(URL.createObjectURL(droppedFile));
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    if (file) {
      mutation.mutate(file);
    }
  };

  const handleCancel = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="lg:col-span-3 flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-orange-600" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-600">
            Upload Final Version
          </h4>
        </div>
        {file && (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5" />
              {mutation.isPending ? 'Uploading...' : 'Submit Final Version'}
            </button>
          </div>
        )}
      </div>
      {previewUrl ? (
        <div className="flex-1 overflow-hidden rounded-xl border border-orange-200 bg-gray-900 shadow-lg">
          <iframe src={previewUrl} title="Final Version Preview" className="h-[600px] w-full" />
        </div>
      ) : (
        <div
          className={`flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors min-h-[400px] ${
            dragActive
              ? 'border-orange-500 bg-orange-100'
              : 'border-orange-300 bg-orange-50 hover:bg-orange-100'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleChange}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mb-4">
            <Upload className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Final Version</h3>
          <p className="text-sm text-gray-600 mb-4 text-center max-w-sm">
            The review period has ended. Please upload your final revised paper based on the
            reviewer feedback.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Browse Files
          </button>
          <p className="text-xs text-gray-500 mt-3">or drag and drop your PDF here</p>
        </div>
      )}
    </div>
  );
};

export default UploadFinalSection;
