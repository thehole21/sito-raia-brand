import SeoBreadcrumbs from '@/components/seo-breadcrumbs';
import { pageMetadata } from '@/lib/seo';
import ProjectsGrid from '@/components/projects-grid';
import './project-stories.css';
import './projects-showcase.css';

export const metadata = pageMetadata('/progetti');

export default function ProgettiPage() {
  return (
    <>
      <SeoBreadcrumbs route="/progetti"/><section className="page-opening shell">
        <div className="page-opening__eyebrow">
          <span className="little-dot" aria-hidden="true" /> LAVORI REALIZZATI
        </div>
        <div className="page-opening__grid">
          <h1>Le idee,<br /><em>realizzate.</em></h1>
          <p>
            Non soltanto il risultato. Entra nei lavori RAIA e segui,
            attraverso le immagini disponibili, il percorso dalla prima idea alla realizzazione.
          </p>
        </div>
      </section>
      <ProjectsGrid />
    </>
  );
}
