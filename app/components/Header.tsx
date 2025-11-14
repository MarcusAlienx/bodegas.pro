import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <img
        alt="BuscaBodegas.com Logo - Tu portal de bodegas"
        className="h-6"
        src="/bodegas.pro_Logo_100h.svg"
        loading="lazy"
      />
      <button aria-label="User account">
        <span className="material-icons text-3xl">account_circle</span>
      </button>
    </header>
  );
};

export default Header;
