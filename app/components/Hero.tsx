import React from 'react';

const Hero = () => {
  return (
    <main className="flex-grow flex flex-col justify-center">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">
          <span className="gradient-text">Hola, Usuario!</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mt-2">
          Que Bodega buscas o publicas hoy?
        </p>
        <div className="mt-8">
          <label
            className="text-sm font-medium text-gray-400 mb-2 text-left block"
            htmlFor="search-input"
          >
            Busquemos tu siguiente proyecto
          </label>
          <div className="relative">
            <div className="bg-gray-800 rounded-lg shadow-lg gradient-bg gradient-border-textarea">
              <textarea
                className="w-full bg-transparent border-none rounded-lg p-4 focus:ring-0 focus:border-transparent resize-none text-gray-200 placeholder-gray-500"
                id="search-input"
                placeholder="Busca por m2, zona, características, etc..."
                rows={5}
              ></textarea>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center justify-end mt-2 space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors">
                Bodegas Renta GDL
              </button>
              <button className="px-3 py-1 text-sm bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors">
                Bodegas en Venta MTY
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="material-icons text-amber-500">add</span>
              <span>+Nueva Publicacion</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
              <span className="material-icons text-amber-500">
                cloud_upload
              </span>
              <span>Importar Publicacion</span>
            </button>
          </div>
          <div className="mt-10">
            <p className="text-sm font-medium text-gray-500 mb-4">
              Portales inmobiliarios incluidos
            </p>
            <div className="flex justify-center items-center space-x-6">
              <img
                alt="Lamudi logo"
                className="h-5 opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRGOq5bmpAvgX4pKXGqCz7T0U5PjdPLbv_zQty3BrMylFO14y6EmwcjHApdR4YeukJacpB-FxVgROF9MryXzuhKA9ekE9ABo6P-B6fyyfvepMh8GBcyZmqG4Fav9I-K0lDwvSxT9Cy1f9jeuG9iFHJmrhxFXJipVonSo8Y__I-j2n71ZWxIYSGaaqvGc_6L5QhRoUZX-CQFE1ELz39AtAV0z0f0XR6OFs2TvNNQM1G1IBtsDgG9Oh9uz29cdCLES-y1kTbn0a0N5M"
              />
              <img
                alt="Inmuebles24 logo"
                className="h-5 opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuxWBr5x60pl4yi26tuq3stFKMIRMB7ipw05Raq51xfQcu_mud_srd9FqY3FOoVZ6K5d_v1yWjtfNOIWai1aopvhRr-2yx7Nht7P8tQrZ_TOrUA9ralSFA7NJKI8OPotN_fNI5QdkDOr6gfF8WK7RiJi_Api3EQQsGB00MW7dLp2bSISBDJjuZQNG3YSInKKh8STEvvShtzRyLWI36vcflCmsDbzLxJJ50nkib8SyxME98jySesKj58U4ag4HhkE2i35-hiVLS_O0"
              />
              <img
                alt="Mitula logo"
                className="h-4 opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeUrYOqHtwJFcZsz_083Wj9Z6og1ymWEZeSHruz7MyklMJFXNdmclg09PDLHRLYxzcU7orIRDkYeaMkdM3q7z9wfO5ZahtouL00CeZLwUHrwMYIxZg2Yg8_oM9euJX-OjYUwZkdQZ-2CXkYcStQQqfYVEMlBdHNawp1o0CusTr4SPaOSdHS2xwaagpz-jDerw2OjhQeiQ5895aZmt_r8tgknayx-BA4KRB_0b41PGM7gN1wNDky4K0F_ZYHNy8XlBQXZSpMUHuuHc"
              />
              <img
                alt="Vivanuncios logo"
                className="h-5 opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0oU-qjDL0aknq4q92p-fMj7ayT2yN6R0Ger0Jb4B6N55RRL1TITVM5QZYkU2CR1yXpJFUxV_3vrgh4KPCKYXW2_y16m-qy52uUjde9Dd8Tbiv-IkdTUO5Q2VsUfsn55usVCAqWGurTl9GrU5IEBxPA7fNT-pIRma3jto15Yjv8HSRHRpVTm0VhjQfuIFz6u1gszInudhpha2ggcjn78-QcPRIC5munKkogJ8GLgnnCR0WA7CNdCOeveL2c5bOgYjGcND-Mylu1_Q"
              />
              <img
                alt="Trovit logo"
                className="h-5 opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXv7TPKHU_hXXIDyheiQTgn7hSd69Y_kPmZCKJOwkI1BZ8seQivun8b9s8wlzbLVL4tIRdxXrjrmABWx0Poj9Wc1PGbSugIk5PbBD5IBesas_KNGWIdHM9yViaGmAzrsvMnWj6lra20cDEh-3cXJcI9biXAdin8X5jlU5DHtyebuaioOxqa3NEWuVEIbIGHuDo2rfErqhfqhGKsI-ZmIKzDQdcC4ODT5afBTL_rpR-onl-ByppIvoS0sOJx_A7b1h82k2WnHrLN-g"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
