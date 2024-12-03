import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#004aad] to-[#0066ff] py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-8">
        <img 
          src="https://cdn.shopify.com/s/files/1/0709/3157/9175/files/Untitled_300_x_300_px_16.png?v=1729958000" 
          alt="Happy Mow Technologies Logo" 
          className="h-20 w-auto"
        />
        <span className="text-white text-sm">
          Created And Developed by Happy Mow Technologies LLC. 2024
        </span>
      </div>
    </div>
  );
};

export default Footer;