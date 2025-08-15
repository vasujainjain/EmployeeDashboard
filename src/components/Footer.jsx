import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-8 bg-[#232936] text-center text-gray-400 text-sm rounded-t-lg shadow-inner">
      © {new Date().getFullYear()} Vasu Jain. All rights reserved
    </footer>
  );
}