import PageLayout from '../components/PageLayout';

// Tato stránka již není potřeba, protože vše je nyní v TPK (dříve TrailParkKomarka).
const TPK = () => {
  return (
    <PageLayout title="TPK" description="Moderní MTB trailpark v Krušných horách – zábavné stezky pro všechny úrovně jezdců">
      <div className="flex flex-col items-center justify-center min-h-[40vh] py-16">
        <div className="bg-gradient-to-r from-tjk-blue to-blue-400 text-white px-8 py-10 rounded-2xl shadow-lg text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Připravujeme.</h1>
          <p className="text-lg md:text-xl text-white/90">Stránka TPK (TrailPark Komárka) bude brzy spuštěna.<br/> Sledujte novinky a těšte se na moderní trailpark v Krušných horách!</p>
        </div>
        <div className="w-full max-w-2xl mt-8 animate-fade-in-up">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-8 text-white shadow-lg flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Chcete se zapojit do budování trailparku?</h2>
            <p className="mb-6 max-w-md text-white/90">Hledáme dobrovolníky pro rozšíření a údržbu trailů v areálu Komáří vížka. Staňte se součástí komunity a pomozte nám tvořit nové trasy!</p>
            <a href="/dobrovolnici">
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-md transition-colors text-base shadow-md hover:shadow-lg flex items-center gap-2">
                Chci se zapojit
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TPK;
