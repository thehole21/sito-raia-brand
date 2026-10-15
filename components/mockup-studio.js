
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Italic,
  RotateCcw,
  Type,
  Upload,
  X,
  Info,
  Move,
} from "lucide-react";

// Aree personalizzabili sui mockup 1200 x 1000.
const PRODUCTS = [
   {
    id: "zaino",
    name: "Zaino",
    area: { x: 48, y: 31, w: 29, h: 38 },
  },
  {
    id: "striscione",
    name: "Striscione",
    area: { x: 16, y: 34, w: 68, h: 29 },
  },
  {
    id: "vela",
    name: "Bandiera a vela",
    area: { x: 46, y: 23, w: 15, h: 37 },
  },
  {
    id: "rollup",
    name: "Roll-up",
    area: { x: 37, y: 14, w: 26, h: 66 },
  },
  {
    id: "shopper",
    name: "Shopper",
    area: { x: 43, y: 46, w: 20, h: 27 },
  },
  {
    id: "tshirt",
    name: "T-shirt",
    area: { x: 42, y: 31, w: 21, h: 31 },
  },

  // NUOVI PRODOTTI
  {
    id: "cappello",
    name: "Cappellino",
    area: { x: 32, y: 30, w: 40, h: 26 },
  },
  {
    id: "penna",
    name: "Penna",
    area: { x: 47, y: 24, w: 24, h: 30 },
  },
  {
    id: "borraccia",
    name: "Borraccia",
    area: { x: 39, y: 37, w: 25, h: 39 },
  },
  {
    id: "cartellone-stradale",
    name: "Cartellone stradale",
    area: { x: 20, y: 16, w: 62, h: 34 },
  },
  {
    id: "espositore-verticale",
    name: "Espositore verticale",
    area: { x: 41, y: 16, w: 24, h: 66 },
  },
  {
    id: "espositore-orizzontale",
    name: "Espositore orizzontale",
    area: { x: 21, y: 26, w: 60, h: 46 },
  },
  {
    id: "striscione-verticale",
    name: "Striscione verticale",
    area: { x: 36, y: 18, w: 31, h: 66 },
  },
  {
    id: "tazza",
    name: "Tazza",
    area: { x: 32, y: 32, w: 32, h: 44 },
  },
  {
    id: "quaderno",
    name: "Quaderno",
    area: { x: 34, y: 19, w: 32, h: 62 },
  },
  {
    id: "pannello-rigido",
    name: "Pannello rigido",
    area: { x: 36, y: 16, w: 29, h: 64 },
  },
];

const FONTS = [
  {
    label: "Moderno",
    value: "Arial, Helvetica, sans-serif",
  },
  {
    label: "Editoriale",
    value: "Georgia, 'Times New Roman', serif",
  },
  {
    label: "Geometrico",
    value: "'Trebuchet MS', Arial, sans-serif",
  },
  {
    label: "Classico",
    value: "Verdana, Geneva, sans-serif",
  },
  {
    label: "D'impatto",
    value: "Impact, 'Arial Narrow', sans-serif",
  },
];

const clamp = (num, min, max) =>
  Math.min(Math.max(num, min), max);

const DEFAULT_DESIGN = {
  logo: {
    x: 50,
    y: 35,
    size: 55,
    rotation: 0,
  },
  text: {
    x: 50,
    y: 71,
    width: 84,
    rotation: 0,
  },
};

const CAMERA_FRAMES = 24;

const frameSrc = (id, frame) =>
  `/mockups/360/${id}/${String(frame + 1).padStart(2, "0")}.webp`;

export default function MockupStudio() {
  const [productId, setProductId] = useState("zaino");
  const [designs, setDesigns] = useState({});
  const [active, setActive] = useState("logo");

  const [logoUrl, setLogoUrl] = useState("");
  const [logoName, setLogoName] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [brand, setBrand] = useState("");
  const [tagline, setTagline] = useState("");

  const [font, setFont] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState(38);
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [textColor, setTextColor] = useState("#202020");

  const [showArea, setShowArea] = useState(false);
  const [stageWidth, setStageWidth] = useState(1200);

  const [has360, setHas360] = useState(false);
  const [view, setView] = useState("front");
  const [frame, setFrame] = useState(0);

  const stageRef = useRef(null);
  const areaRef = useRef(null);
  const dragRef = useRef(null);
  const spinRef = useRef(null);

  const product =
    PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const design = designs[productId] || DEFAULT_DESIGN;

  const textExists = Boolean(
    brand.trim() || tagline.trim()
  );

  // Adatta le dimensioni dei testi allo schermo.
  useEffect(() => {
    const element = stageRef.current;

    if (!element) return;

    const update = () => {
      setStageWidth(
        element.getBoundingClientRect().width
      );
    };

    update();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(update);

    observer.observe(element);

    return () => observer.disconnect();
  }, [view]);

  // Libera la memoria delle immagini caricate.
  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  // Abilita il 360 solo quando sono presenti
  // tutti i 24 fotogrammi del prodotto.
  useEffect(() => {
    let cancelled = false;

    setHas360(false);
    setView("front");
    setFrame(0);

    const loadFrame = (index) =>
      new Promise((resolve) => {
        const probe = new window.Image();

        probe.onload = () => resolve(true);
        probe.onerror = () => resolve(false);

        probe.src = frameSrc(productId, index);
      });

    loadFrame(0).then((first) => {
      if (!first || cancelled) return;

      Promise.all(
        Array.from(
          { length: CAMERA_FRAMES - 1 },
          (_, i) => loadFrame(i + 1)
        )
      ).then((results) => {
        if (!cancelled) {
          setHas360(results.every(Boolean));
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  // Aggiorna posizione, dimensione e rotazione
  // del logo o del testo sul prodotto.
  function updateLayer(layer, changes) {
    setDesigns((previous) => {
      const current =
        previous[productId] || DEFAULT_DESIGN;

      return {
        ...previous,
        [productId]: {
          ...current,
          [layer]: {
            ...current[layer],
            ...changes,
          },
        },
      };
    });
  }

  // Inizia il trascinamento col mouse o col dito.
  function beginDrag(event, layer) {
    if (
      event.button !== 0 &&
      event.pointerType === "mouse"
    ) {
      return;
    }

    const area = areaRef.current;

    if (!area) return;

    const rect = area.getBoundingClientRect();
    const current = design[layer];

    dragRef.current = {
      layer,
      px: event.clientX,
      py: event.clientY,
      x: current.x,
      y: current.y,
      w: rect.width,
      h: rect.height,
    };

    setActive(layer);

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  // Sposta l'elemento nell'area personalizzabile.
  function drag(event) {
    const start = dragRef.current;

    if (!start) return;

    const dx =
      ((event.clientX - start.px) / start.w) * 100;

    const dy =
      ((event.clientY - start.py) / start.h) * 100;

    const edge =
      start.layer === "logo"
        ? design.logo.size / 2
        : design.text.width / 2;

    const marginX = clamp(edge, 5, 45);

    updateLayer(start.layer, {
      x: clamp(
        start.x + dx,
        marginX,
        100 - marginX
      ),
      y: clamp(start.y + dy, 8, 92),
    });
  }

  function stopDrag(event) {
    dragRef.current = null;

    if (
      event.currentTarget.hasPointerCapture?.(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  }

  // Spostamento anche con le frecce della tastiera.
  function moveWithKeyboard(event, layer) {
    const arrows = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };

    const movement = arrows[event.key];

    if (!movement) return;

    event.preventDefault();

    const step = event.shiftKey ? 5 : 1;

    updateLayer(layer, {
      x: clamp(
        design[layer].x + movement[0] * step,
        8,
        92
      ),
      y: clamp(
        design[layer].y + movement[1] * step,
        8,
        92
      ),
    });
  }

  // Caricamento del logo.
  function upload(event) {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ];

    if (
      !allowed.includes(file.type) ||
      file.size > 8 * 1024 * 1024
    ) {
      setUploadError(
        "Usa PNG, JPG, WEBP o SVG fino a 8 MB."
      );
      return;
    }

    setUploadError("");
    setLogoName(file.name);
    setLogoUrl(URL.createObjectURL(file));
    setActive("logo");
    setView("front");
  }

  function clearLogo() {
    setLogoUrl("");
    setLogoName("");
    setUploadError("");
  }

  // Ripristina il configuratore.
  function reset() {
    setDesigns({});
    clearLogo();

    setBrand("");
    setTagline("");

    setFont(FONTS[0].value);
    setFontSize(38);

    setBold(true);
    setItalic(false);

    setTextColor("#202020");
    setActive("logo");

    setView("front");
  }

  // Rotazione 360 tramite sequenza di immagini.
  function startSpin(event) {
    spinRef.current = {
      x: event.clientX,
      frame,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  }

  function spin(event) {
    if (!spinRef.current) return;

    const delta = Math.round(
      (event.clientX - spinRef.current.x) / 13
    );

    setFrame(
      (
        spinRef.current.frame -
        delta +
        CAMERA_FRAMES * 100
      ) % CAMERA_FRAMES
    );
  }

  function endSpin(event) {
    spinRef.current = null;

    if (
      event.currentTarget.hasPointerCapture?.(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  }

  const controls = (layer) => ({
    onPointerDown: (event) =>
      beginDrag(event, layer),

    onPointerMove: drag,
    onPointerUp: stopDrag,
    onPointerCancel: stopDrag,

    onKeyDown: (event) =>
      moveWithKeyboard(event, layer),
  });

  return (
    <div className="raia-studio">
      {/* PANNELLO LATERALE */}

      <aside
        className="raia-studio__sidebar"
        aria-label="Personalizzazione prodotto"
      >
        {/* SCELTA PRODOTTO */}

        <section className="raia-studio__panel">
          <div className="raia-studio__step">
            01 / PRODOTTO
          </div>

          <h2>Scegli il supporto</h2>

          <div className="raia-studio__products">
            {PRODUCTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  productId === item.id
                    ? "is-active"
                    : ""
                }
                aria-pressed={
                  productId === item.id
                }
                onClick={() => {
                  setProductId(item.id);
                  setActive("logo");
                }}
              >
                {item.name}

                {productId === item.id && (
                  <Check size={15} />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* PERSONALIZZAZIONE LOGO */}

        <section className="raia-studio__panel">
          <div className="raia-studio__step">
            02 / GRAFICA
          </div>

          <h2>Il tuo logo</h2>

          <label className="raia-studio__upload">
            <Upload
              size={18}
              strokeWidth={1.7}
            />

            <span>
              {logoUrl
                ? "Sostituisci logo"
                : "Carica il tuo logo"}
            </span>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.svg"
              onChange={upload}
            />
          </label>

          {logoName && (
            <div className="raia-studio__uploaded">
              <span title={logoName}>
                {logoName}
              </span>

              <button
                type="button"
                onClick={clearLogo}
                aria-label="Elimina il logo"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {uploadError && (
            <p
              role="alert"
              className="raia-studio__error"
            >
              {uploadError}
            </p>
          )}

          <p className="raia-studio__help">
            Trascina il logo nell'area del prodotto,
            anche dal telefono.
          </p>

          {logoUrl && (
            <>
              <label className="raia-studio__field">
                Dimensione logo

                <strong>
                  {design.logo.size}%
                </strong>

                <input
                  type="range"
                  min="15"
                  max="85"
                  value={design.logo.size}
                  onChange={(e) =>
                    updateLayer("logo", {
                      size: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label className="raia-studio__field">
                Rotazione logo

                <strong>
                  {design.logo.rotation}°
                </strong>

                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={design.logo.rotation}
                  onChange={(e) =>
                    updateLayer("logo", {
                      rotation: Number(e.target.value),
                    })
                  }
                />
              </label>
            </>
          )}
        </section>

        {/* PERSONALIZZAZIONE TESTO */}

        <section className="raia-studio__panel">
          <div className="raia-studio__step">
            03 / TESTO
          </div>

          <h2>Testo sul prodotto</h2>

          <label className="raia-studio__field">
            Nome / testo principale

            <input
              type="text"
              maxLength={45}
              value={brand}
              placeholder="Es. Il tuo brand"
              onChange={(e) => {
                setBrand(e.target.value);
                setActive("text");
              }}
            />
          </label>

          <label className="raia-studio__field">
            Testo secondario (opzionale)

            <input
              type="text"
              maxLength={65}
              value={tagline}
              placeholder="Es. Comunichiamo idee"
              onChange={(e) => {
                setTagline(e.target.value);
                setActive("text");
              }}
            />
          </label>

          <label className="raia-studio__field">
            Carattere

            <select
              value={font}
              onChange={(e) =>
                setFont(e.target.value)
              }
            >
              {FONTS.map((item) => (
                <option
                  key={item.label}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="raia-studio__format">
            <button
              type="button"
              className={bold ? "is-active" : ""}
              aria-pressed={bold}
              onClick={() => setBold(!bold)}
            >
              <b>B</b>
              Grassetto
            </button>

            <button
              type="button"
              className={italic ? "is-active" : ""}
              aria-pressed={italic}
              onClick={() => setItalic(!italic)}
            >
              <Italic size={15} />
              Corsivo
            </button>
          </div>

          <label className="raia-studio__field">
            Dimensione carattere

            <strong>
              {fontSize}
            </strong>

            <input
              type="range"
              min="16"
              max="95"
              value={fontSize}
              onChange={(e) =>
                setFontSize(Number(e.target.value))
              }
            />
          </label>

          <label className="raia-studio__field">
            Larghezza blocco testo

            <strong>
              {design.text.width}%
            </strong>

            <input
              type="range"
              min="35"
              max="94"
              value={design.text.width}
              onChange={(e) =>
                updateLayer("text", {
                  width: Number(e.target.value),
                })
              }
            />
          </label>

          <label className="raia-studio__field">
            Rotazione testo

            <strong>
              {design.text.rotation}°
            </strong>

            <input
              type="range"
              min="-90"
              max="90"
              value={design.text.rotation}
              onChange={(e) =>
                updateLayer("text", {
                  rotation: Number(e.target.value),
                })
              }
            />
          </label>

          <label
            className="
              raia-studio__field
              raia-studio__color
            "
          >
            Colore testo

            <span>
              <input
                aria-label="Colore testo"
                type="color"
                value={textColor}
                onChange={(e) =>
                  setTextColor(e.target.value)
                }
              />

              {textColor.toUpperCase()}
            </span>
          </label>
        </section>

        <button
          type="button"
          className="raia-studio__reset"
          onClick={reset}
        >
          <RotateCcw size={16} />
          Ricomincia
        </button>
      </aside>

      {/* ANTEPRIMA INTERATTIVA */}

      <div className="raia-studio__preview">
        <div className="raia-studio__previewhead">
          <div>
            <span className="raia-studio__step">
              ANTEPRIMA INDICATIVA
            </span>

            <h2>
              {product.name}
            </h2>
          </div>

          <div
            className="raia-studio__modes"
            role="group"
            aria-label="Modalità anteprima"
          >
            <button
              type="button"
              className={
                view === "front"
                  ? "is-active"
                  : ""
              }
              aria-pressed={view === "front"}
              onClick={() => setView("front")}
            >
              Personalizza
            </button>

            {has360 && (
              <button
                type="button"
                className={
                  view === "360"
                    ? "is-active"
                    : ""
                }
                aria-pressed={view === "360"}
                onClick={() => setView("360")}
              >
                Vista 360°
              </button>
            )}
          </div>
        </div>

        {/* VISTA FRONTALE */}

        {view === "front" ? (
          <div
            ref={stageRef}
            className="raia-studio__canvas"
          >
            <img
              className="raia-studio__product-image"
              src={`/mockups/${productId}.png`}
              draggable={false}
              alt={`Anteprima del prodotto: ${product.name}`}
            />

            {/* AREA PERSONALIZZABILE */}

            <div
              ref={areaRef}
              className={
                `raia-studio__print-area ${
                  showArea ? "is-visible" : ""
                }`
              }
              style={{
                left: `${product.area.x}%`,
                top: `${product.area.y}%`,
                width: `${product.area.w}%`,
                height: `${product.area.h}%`,
              }}
            >
              {/* LOGO TRASCINABILE */}

              {logoUrl && (
                <button
                  type="button"
                  {...controls("logo")}
                  aria-label="Trascina il logo. Usa le frecce per spostarlo."
                  className={
                    `raia-studio__layer raia-studio__layer--logo ${
                      active === "logo"
                        ? "is-active"
                        : ""
                    }`
                  }
                  style={{
                    left: `${design.logo.x}%`,
                    top: `${design.logo.y}%`,
                    width: `${design.logo.size}%`,
                    transform:
                      `translate(-50%, -50%) rotate(${design.logo.rotation}deg)`,
                  }}
                >
                  <img
                    alt=""
                    src={logoUrl}
                    draggable={false}
                  />
                </button>
              )}

              {/* TESTO TRASCINABILE */}

              {textExists && (
                <button
                  type="button"
                  {...controls("text")}
                  aria-label="Trascina il testo. Usa le frecce per spostarlo."
                  className={
                    `raia-studio__layer raia-studio__layer--text ${
                      active === "text"
                        ? "is-active"
                        : ""
                    }`
                  }
                  style={{
                    left: `${design.text.x}%`,
                    top: `${design.text.y}%`,
                    width: `${design.text.width}%`,
                    transform:
                      `translate(-50%, -50%) rotate(${design.text.rotation}deg)`,
                    fontFamily: font,
                    fontWeight: bold ? 750 : 400,
                    fontStyle: italic
                      ? "italic"
                      : "normal",
                    color: textColor,
                    fontSize:
                      `${Math.max(
                        8,
                        fontSize * stageWidth / 1200
                      )}px`,
                  }}
                >
                  {brand.trim() && (
                    <span>{brand}</span>
                  )}

                  {tagline.trim() && (
                    <small>{tagline}</small>
                  )}
                </button>
              )}
            </div>

            {!logoUrl && !textExists && (
              <div className="raia-studio__empty">
                <ImagePlus size={17} />
                Carica il logo o inserisci il testo
                per iniziare
              </div>
            )}
          </div>
        ) : (
          /* VISTA 360° */

          <div
            className="raia-studio__turntable"
            onPointerDown={startSpin}
            onPointerMove={spin}
            onPointerUp={endSpin}
            onPointerCancel={endSpin}
          >
            <img
              src={frameSrc(productId, frame)}
              draggable={false}
              alt={
                `${product.name}, angolazione ${
                  Math.round(
                    frame * 360 / CAMERA_FRAMES
                  )
                } gradi`
              }
            />

            <div className="raia-studio__turn-controls">
              <button
                aria-label="Ruota a sinistra"
                type="button"
                onPointerDown={(e) =>
                  e.stopPropagation()
                }
                onClick={() =>
                  setFrame(
                    (frame + CAMERA_FRAMES - 1) %
                    CAMERA_FRAMES
                  )
                }
              >
                <ChevronLeft size={17} />
              </button>

              <span>
                Trascina per ruotare ·{" "}
                {Math.round(
                  frame * 360 / CAMERA_FRAMES
                )}°
              </span>

              <button
                aria-label="Ruota a destra"
                type="button"
                onPointerDown={(e) =>
                  e.stopPropagation()
                }
                onClick={() =>
                  setFrame(
                    (frame + 1) % CAMERA_FRAMES
                  )
                }
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* STRUMENTI SOTTO L'ANTEPRIMA */}

        <div className="raia-studio__previewtools">
          {view === "front" && (
            <>
              <div
                className="raia-studio__select-layer"
                role="group"
                aria-label="Elemento da modificare"
              >
                {logoUrl && (
                  <button
                    className={
                      active === "logo"
                        ? "is-active"
                        : ""
                    }
                    type="button"
                    onClick={() =>
                      setActive("logo")
                    }
                  >
                    <ImagePlus size={15} />
                    Logo
                  </button>
                )}

                {textExists && (
                  <button
                    className={
                      active === "text"
                        ? "is-active"
                        : ""
                    }
                    type="button"
                    onClick={() =>
                      setActive("text")
                    }
                  >
                    <Type size={15} />
                    Testo
                  </button>
                )}
              </div>

              <label className="raia-studio__area-toggle">
                <input
                  type="checkbox"
                  checked={showArea}
                  onChange={(e) =>
                    setShowArea(e.target.checked)
                  }
                />

                Mostra area indicativa
              </label>
            </>
          )}
        </div>

        {/* INFORMAZIONI */}

        <p className="raia-studio__disclaimer">
          <Info size={17} />

          L'anteprima serve a visualizzare il
          progetto. La posizione è indicativa:
          RAIA confermerà area stampabile,
          colori e fattibilità prima della
          produzione.

          {has360 &&
            view === "360" &&
            " La vista 360° mostra il supporto, non la stampa applicata su tutti gli angoli."}
        </p>

        <p className="raia-studio__hint">
          <Move size={16} />
          Trascina logo e testo nell'anteprima.
          Da tastiera usa le frecce per piccoli
          aggiustamenti.
        </p>
      </div>
    </div>
  );
}
