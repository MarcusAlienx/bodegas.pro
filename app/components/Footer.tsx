import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-gray-500 text-sm mt-8">
      <p>© 2024 BuscaBodegas.com. Todos los derechos reservados.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="#" aria-label="Terms and conditions">
          Términos y Condiciones
        </a>
        <a href="#" aria-label="Privacy policy">
          Privacidad
        </a>
      </div>
    </footer>
  );
};

export default Footer;
