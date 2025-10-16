// src/pages/LandingMatPage.tsx
import React from 'react';
import heroImg from '../assets/images/hero.jpg';
import gallery1 from '../assets/images/gallery1.jpg';
import gallery2 from '../assets/images/gallery2.jpg';
import gallery3 from '../assets/images/gallery3.jpg';

const LandingMatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85 flex flex-col justify-center items-start px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Nafukovací dopadová matrace
          </h1>
          <p className="text-lg md:text-2xl text-white drop-shadow-lg">
            Bezpečný trénink skoků a triků pro začátečníky i pokročilé
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="inline-block mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bezpečnost</h3>
            <p>Snižuje náraz a minimalizuje riziko zranění.</p>
          </div>
          <div>
            <div className="inline-block mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Všestrannost</h3>
            <p>Vhodná pro gymnastiku, skateparky, kiting a další sporty.</p>
          </div>
          <div>
            <div className="inline-block mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M3 10h18M3 14h18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Jednoduché použití</h3>
            <p>Rychlé nafouknutí, skládání a mobilita.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Galerie</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img src={gallery1} alt="Mat race detail" className="rounded-lg shadow-md" />
          <img src={gallery2} alt="Mat race v parku" className="rounded-lg shadow-md" />
          <img src={gallery3} alt="Skok na matraci" className="rounded-lg shadow-md" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-8 text-center">
        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
          Zjistit více
        </button>
      </section>
    </div>
  );
};

export default LandingMatPage;
