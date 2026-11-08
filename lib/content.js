// Contenuti editoriali basati esclusivamente sul sito ufficiale raiaweb.it.
// Le fotografie sono URL originali pubblicati sul sito RAIA: nessuna immagine stock.
export const COMPANY = {
  name: 'RAIA srl',
  tagline: 'Pensa · Crea · Stampa',
  description: 'Servizi di stampa e comunicazione',
  email: 'info@raiaweb.it',
  phone: '06 66182286',
  phoneLink: '+390666182286',
  address: 'Via Bruno Pontecorvo 46, 00012 Guidonia Montecelio (RM)',
  hours: 'Lunedì — Venerdì, 09:00 — 18:00',
  vat: '09368991007',
  sdi: 'M5UXCR1',
  map: 'https://www.google.com/maps/search/?api=1&query=Via+Bruno+Pontecorvo+46%2C+Guidonia+Montecelio'
};

export const SOCIALS = [
  { name: 'Facebook', key: 'facebook', href: 'https://www.facebook.com/profile.php?id=100063576791465' },
  { name: 'Instagram', key: 'instagram', href: 'https://www.instagram.com/raia_srl/' },
  { name: 'LinkedIn', key: 'linkedin', href: 'https://www.linkedin.com/company/raia-srl/about/' }
];


export const NAV = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Progetti", href: "/progetti" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
];


export const IMAGES = {
  gucci: '/wp-content/uploads/2026/04/8f21d933-4943-4638-a3e7-1cc66e61ca50.jpg',
  ntt: '/wp-content/uploads/2023/12/ntt-data-insegna-768x576.jpg',
  caps: '/wp-content/uploads/2023/12/cappellini-rimac-768x576.jpg',
  kit: '/wp-content/uploads/2023/12/kit-uilpa-768x576.jpg',
  wrap: '/wp-content/uploads/2023/12/wrapping-maserati-768x576.jpg',
  interior: '/wp-content/uploads/2026/04/Jungle-_B-768x576.jpg',
  installation: '/wp-content/uploads/2026/04/IMG_20210514_123806-768x576.jpg'
};

export const SERVICES = [
  {
    id: 'tipografia', number: '01', title: 'Servizi di stampa', detail: 'Dalla pagina alla materia.',
    short: 'Editoria, stampa commerciale e packaging.',
    description: 'Produzioni editoriali e stampati, con lavorazioni seguite dalla stampa fino all’imballaggio.',
    image: IMAGES.kit, alt: 'Kit stampato realizzato da RAIA, fotografato sul sito aziendale',
    tags: ['Libri', 'Cataloghi', 'Pieghevoli', 'Packaging'],
    facts: [
      { title: 'Produzione editoriale', text: 'Libri, riviste, cataloghi, pieghevoli, flyer, volantini, biglietti da visita e manifesti.' },
      { title: 'Lavorazioni', text: 'Stampa, rifilo, preparazione delle copertine, legatura, fresatura, nobilitazioni e imballaggio.' },
      { title: 'Formati e supporti', text: 'Dal piccolo al grande formato, su supporti rigidi e flessibili.' },
      { title: 'Libri e packaging', text: 'Stampa libri on-demand per tirature personalizzate; realizzazione di fustelle e scatole.' },
    ],
    note: 'Non vengono accettate singole tirature.'
  },
  {
    id: 'grande-formato', number: '02', title: 'Stampa in grande formato', detail: 'Visibilità, senza limiti di superficie.',
    short: 'Comunicazione stampata su grande formato.',
    description: 'Soluzioni visive per rendere riconoscibile un’attività, in spazi interni ed esterni.',
    image: IMAGES.gucci, alt: 'Allestimento stampato e applicato a una vetrina Gucci da RAIA',
    tags: ['Banner', 'Pannelli', 'Tessuti', 'Carta da parati'],
    facts: [
      { title: 'Per essere visibili', text: 'Bandiere, striscioni, manifesti, pannelli e calamite.' },
      { title: 'Supporti adesivi', text: 'PVC adesivo, pellicole cast e supporti microforati.' },
      { title: 'Materiali flessibili', text: 'Banner, tessuti e canvas.' },
      { title: 'Per gli ambienti', text: 'Carte da parati e superfici personalizzate con la stampa.' },
    ]
  },
  {
    id: 'allestimenti', number: '03', title: 'Insegne e allestimenti', detail: 'Le idee prendono spazio.',
    short: 'Insegne, loghi 3D, scenografie e stand.',
    description: 'Soluzioni fisiche per rendere un marchio immediatamente riconoscibile.',
    image: IMAGES.ntt, alt: 'Insegna NTT DATA realizzata su una parete verde stabilizzata',
    tags: ['Insegne', 'Stand', 'Taglio laser', 'Loghi 3D'],
    facts: [
      { title: 'Insegne', text: 'Insegne semplici o luminose, pannelli, targhe e totem.' },
      { title: 'Allestimenti', text: 'Stand fieristici, scenografie ed elementi decorativi.' },
      { title: 'Sagomatura', text: 'Taglio laser e lavorazione del polistirolo per loghi 3D e sagome ad alta precisione.' },
      { title: 'Finitura', text: 'Verniciatura e fissaggio degli elementi realizzati.' },
    ]
  },
  {
    id: 'wrapping', number: '04', title: 'Wrapping e interior design', detail: 'Nuova identità alle superfici.',
    short: 'Pellicole per veicoli, vetrine e interni.',
    description: 'Dalla flotta aziendale agli ambienti di lavoro, le superfici diventano strumenti di comunicazione.',
    image: IMAGES.interior, alt: 'Pellicola decorativa applicata a una parete vetrata da RAIA',
    tags: ['Car wrapping', 'Vetrofanie', 'Interior design'],
    facts: [
      { title: 'Veicoli commerciali', text: 'Progettazione e allestimento wrapping per mezzi commerciali e auto.' },
      { title: 'Vetrine e uffici', text: 'Vetrofanie pubblicitarie oppure decorative e di design.' },
      { title: 'Pellicole', text: 'Fornitura e applicazione di pellicole per superfici vetrate, comprese pellicole solari.' },
      { title: 'Spazi da rinnovare', text: 'Interventi grafici per rimettere a nuovo ambienti e superfici.' },
    ]
  },
  {
    id: 'gadget', number: '05', title: 'Gadget personalizzati', detail: 'Un brand da portare con sé.',
    short: 'Abbigliamento e oggetti promozionali.',
    description: 'Personalizzazioni pensate per dare continuità all’identità del marchio, anche negli oggetti di ogni giorno.',
    image: IMAGES.caps, alt: 'Cappellini personalizzati Rimac realizzati da RAIA',
    tags: ['Abbigliamento', 'Cappellini', 'Penne', 'Gadget'],
    facts: [
      { title: 'Abbigliamento professionale', text: 'Abbigliamento da lavoro e uniformi personalizzate.' },
      { title: 'Abbigliamento promozionale', text: 'T-shirt e cappellini con identità grafica del brand.' },
      { title: 'Oggettistica', text: 'Penne, ombrelli e gadget per attività promozionali.' },
      { title: 'Identità coordinata', text: 'Personalizzazioni su oggetti e capi per rendere riconoscibile il marchio.' },
    ]
  }
];

export const PROJECTS = [
  { id: 'gucci', title: 'Vetrine floreali', client: 'Gucci', category: 'Vetrofanie', image: IMAGES.gucci, alt: 'Vetrina Gucci con pellicole floreali in fase di allestimento' },
  { id: 'ntt', title: 'Insegna su parete verde', client: 'NTT DATA', category: 'Allestimenti', image: IMAGES.ntt, alt: 'Insegna NTT DATA su parete in muschio stabilizzato' },
  { id: 'caps', title: 'Cappellini personalizzati', client: 'Rimac', category: 'Gadget', image: IMAGES.caps, alt: 'Cappellini rossi e neri Rimac personalizzati' },
  { id: 'kit', title: 'Kit stampato', client: 'UILPA', category: 'Stampa', image: IMAGES.kit, alt: 'Confezione di kit stampato UILPA' },
  { id: 'interior', title: 'Vetrofania decorativa', client: 'Applicazione per interni', category: 'Vetrofanie', image: IMAGES.interior, alt: 'Vetrofania decorativa con foglie su parete di vetro' },
  { id: 'wrapping', title: 'Pellicole per auto', client: 'Car wrapping', category: 'Wrapping', image: IMAGES.wrap, alt: 'Lavorazione di car wrapping su autovettura in officina' }
];
