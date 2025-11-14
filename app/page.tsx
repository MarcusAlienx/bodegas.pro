import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function HomePage() {
  return (
    <div className="bg-gray-900 font-sans text-gray-200">
      <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
