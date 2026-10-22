'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/content';

export default function Servizi() {
  const [current, setCurrent] = useState(0);


  function chooseService(index){setCurrent(index);history.replaceState(null,'','#'+SERVICES[index].id);}
  useEffect(()=>{
    function followAnchor(){
      const hash=window.location.hash.slice(1);
      const index=SERVICES.findIndex((service,i)=>[service.id,'service_'+(i+1),'elementor-tab-title-568'+(i+1),'elementor-tab-content-568'+(i+1)].includes(hash));
      if(index<0)return;
      setCurrent(index);
      requestAnimationFrame(()=>document.getElementById('service-tab-'+SERVICES[index].id)?.scrollIntoView({block:'center',inline:'nearest'}));
    }
    followAnchor();window.addEventListener('hashchange',followAnchor);
    return()=>window.removeEventListener('hashchange',followAnchor);
  },[]);

  function onTabKeyDown(event, index) {
    const count = SERVICES.length;
    let next = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % count;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = count - 1;
    if (next === null) return;
    event.preventDefault();
    chooseService(next);
    document.getElementById(`service-tab-${SERVICES[next].id}`)?.focus();
  }

  return (
    <section className="services-explorer services-explorer--detailed" aria-label="Esplora i servizi RAIA">
      <nav className="services-explorer__tabs" role="tablist" aria-label="Categorie di servizio">
        {SERVICES.map((service, index) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            id={`service-tab-${service.id}`}
            aria-controls={`service-panel-${service.id}`}
            aria-selected={current === index}
            tabIndex={current === index ? 0 : -1}
            className={`services-tab${current === index ? ' is-active' : ''}`}
            onClick={() => chooseService(index)}
            onKeyDown={event => onTabKeyDown(event, index)}
          >
            <strong>{service.title}</strong>
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        ))}
      </nav>

      {SERVICES.map((item,index)=><div key={item.id} hidden={current!==index}
        className="services-explorer__panel"
        role="tabpanel"
        id={`service-panel-${item.id}`}
        aria-labelledby={`service-tab-${item.id}`}
        tabIndex={0}
      >
        <article className="service-showcase service-showcase--detailed" key={item.id}>
          <div className="service-showcase__visual">
            <Image priority={index===0} fetchPriority={index===0?"high":undefined} src={item.image} alt={item.alt} fill sizes="(max-width: 959px) 100vw, 56vw" className="cover-image" />
            <div className="service-showcase__image-caption" aria-hidden="true">
              <span>RAIA / {item.title}</span>
              <span>STAMPA E COMUNICAZIONE</span>
            </div>
          </div>

          <div className="service-showcase__information">
            <div className="service-showcase__lead">
              <p className="service-showcase__overline">IL SERVIZIO</p>
              <h2>{item.title}</h2>
              <p className="service-showcase__description">{item.description}</p>
            </div>

            <div className="service-showcase__details" aria-label={`Dettagli: ${item.title}`}>
              {item.facts.map(fact => (
                <div className="service-showcase__fact" key={fact.title}>
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </div>
              ))}
            </div>
            {item.note && <p className="service-showcase__note"><strong>Da sapere.</strong> {item.note}</p>}
          </div>
        </article>
      </div>)}
    </section>
  );
}
