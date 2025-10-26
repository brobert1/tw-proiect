import { Loader2 } from 'lucide-react';

const PagesLoading = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-text-secondary" strokeWidth={2} />
    </div>
  );
};

export default PagesLoading;
