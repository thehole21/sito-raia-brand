import MockupStudio from "@/components/mockup-studio";
import "./mockup-studio.css";
import "./anteprima-polish.css";
import "./anteprima-unified.css";

export const metadata = {
  title: "Studio Anteprime",
  description: "Prova una personalizzazione indicativa dei supporti RAIA con il tuo logo e i tuoi testi.",
};

export default function AnteprimaPage() {
  return (
    <div className="preview-page">
      <section className="page-opening shell" aria-labelledby="preview-title">
        <div className="page-opening__eyebrow">
          <span className="little-dot" aria-hidden="true" /> STUDIO ANTEPRIME
        </div>
        <div className="page-opening__grid">
          <h1 id="preview-title">
            Il tuo logo.<br />
            <em>In anteprima.</em>
          </h1>
          <p>
            Scegli un supporto, carica il tuo marchio e posiziona logo e testo
            direttamente sul prodotto. Una simulazione prima della stampa.
          </p>
        </div>
      </section>

      <section className="preview-workspace shell" aria-label="Personalizzatore prodotti RAIA">
        <MockupStudio />
      </section>
    </div>
  );
}
