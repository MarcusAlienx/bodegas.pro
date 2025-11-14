import React from 'react';

function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img src="/bodegas.pro_Logo_100h.svg" alt="Bodegas.pro Logo" className="h-24 w-auto" />
          </div>
          <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#2D2D2D] text-white hover:bg-white/20">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] bg-clip-text text-transparent">Encuentra la bodega ideal para tu negocio.</span>
          </h1>
          {/* Search Text Field */}
          <div className="mt-10">
            <label className="flex flex-col">
              <textarea className="form-input flex w-full resize-none rounded-xl border-none bg-[#2D2D2D] p-4 text-base text-[#EAEAEA] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary min-h-36" placeholder="Bodega de 500m2 con anden de carga en Apodaca, NL"></textarea>
            </label>
          </div>
          {/* Chips / Example Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-[#2D2D2D] px-4 hover:bg-[#444]">
              <p className="text-sm font-medium text-[#EAEAEA]">500m2 en Monterrey</p>
            </div>
            <div className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-[#2D2D2D] px-4 hover:bg-[#444]">
              <p className="text-sm font-medium text-[#EAEAEA]">Con oficinas</p>
            </div>
            <div className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-[#2D2D2D] px-4 hover:bg-[#444]">
              <p className="text-sm font-medium text-[#EAEAEA]">Parque Industrial</p>
            </div>
          </div>
          {/* Button Group */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-base font-bold text-black shadow-lg transition-transform duration-200 hover:scale-105">
              <span className="truncate">+ Nueva Publicación</span>
            </button>
            <button className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#444] bg-transparent text-base font-bold text-white transition-colors duration-200 hover:bg-[#2D2D2D]">
              <span className="truncate">Importar Publicación</span>
            </button>
          </div>
        </div>
        {/* Partner Logos Section */}
        <div className="mt-24 w-full">
          <h3 className="text-center text-sm font-medium uppercase tracking-wider text-[#A0A0A0]">Publicamos en los portales más importantes</h3>
          <div className="mt-8 grid grid-cols-2 place-items-center gap-8 sm:grid-cols-4 md:grid-cols-5">
            <img className="h-8 w-auto object-contain" alt="Zillow logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqEMJE-pVgTK4p9nO2D0G_6I28kFPhFFfd67ky4v3f1umv-_n7awaKjXSHmCSTUzhiaqocTQ3P3Yx6eBVEeIW9fwpF5y2A_3DBcDKc9uGQrz8omLMytaRe_ptc3ag4lcfZzH2F-nerad6tHjpRIBYnKi_WH29Pb5z1ThBxM7UjBO9NZAsfLOqizKlFys_FpcYCeIgUHtmPs6G4I_WBsDsoIcV4jj2vSEKcpUAKaO5CLXQwpnhHxlOgBIbZdgD5l-m0FgL3w4Jz2Q"/>
            <img className="h-7 w-auto object-contain" alt="Realtor.com logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCvRDGGVJlpGmetN_sc2HgdPCHP4TkZKNeyuBJh_lfOwb45r9d8MkvMQzfKEpqiHc8EXYm63aUhJIt_ukX-c7hZhJuv5_Kt0LVDV8dPXfjRe8g-sHjw7Wy7KOSzY0pM_v3REglRW_cepB6j3UyCBSyX71KgY_TANQORpaiRz-RVAH7Aw8OQx35Hn72xTG-EPuRECpyvGDvUoIOhfKB4Y5VO0Kvn_Fdb9amy_fZ7e_kXbuar4GhAIs2DPHyB9d2_nPR3NQOLCOwpQ"/>
            <img className="h-6 w-auto object-contain" alt="Redfin logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLFNw-B9u7PasbgApxj4kpHsTdczmMQoD7eV8AK4dQce-eAkflCqJno8RpRsy7fsm14nnW1N3RBB0SU4s58zkgpIA9ekGQyV1HYgWnZ1hZNaysW-DNDyF3envxgy3Y6YUOPUTkltupE5RWlrr-_WRZjtCfysU9M0SOg6d6xQ694bMkD7XMq1Wf9rYbmnIDPBJ57NQDwaxWphnpy2wnh5LTcd6DqTc0c1WkSAKMcI-eVYoI_EeJ_FAUxvB-3louVjRerw7_kVzV0A"/>
            <img className="h-8 w-auto object-contain" alt="Trulia logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Yg1hFyPpZjC8jgHk-qTII0M2ROP16bpeixUIWMdqGlp2YbbrfAKFbNFOaOtuTN0y9uTFUmaYZsTNUFeG7OkcMlfnGvd7lMmfNVDPcffwWW-WLrDCtX4KO9v5o_IVHtSHYEqbCRsODCywpSAFlg03Ca4TUVXun_89oBGGRoxge7FFd_HMpztQdIV8M3J2W_91rAPXaXL-nSEgPWM-tr1HbVZuuiMi04Q8pQA27SBPW3IXNR_WYPpuer4ZdDU5NgaKVymTTyfNaw"/>
            <img className="h-5 w-auto object-contain" alt="LoopNet logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEWDOoenwOnRAxvs6nT9cXjc678WDJV58sPK5v9dKAWutxUIiRQmJautghp6IiYXXaKPLvXAcWCYvnVtts91t-i2PRYWXJNtgItU2id99wDj9kVHzoWWolon-yMJM7CJldgDxWEeByTyX19UKgEZfgpnyp0DNvOQngWRg2mQgFEofeENMAIogksyLzOznK7U_tZMlr5NvxC9XgbeLRCAtIHuxz91pbNgdiUFNMqRckRIxOelOfdhvgc17INGqu-g6RXjySRcbsHQ"/>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-[#A0A0A0]">© 2025 Bodegas.pro -  Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm">
            <a className="text-[#A0A0A0] hover:text-white" href="#">Términos y Condiciones</a>
            <a className="text-[#A0A0A0] hover:text-white" href="#">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;