import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
      <BookOpen size={18} />
    </div>
  );
};

export default Logo;