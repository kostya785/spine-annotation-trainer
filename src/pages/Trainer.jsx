import "./Trainer.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function Trainer() {
  const { t } = useContext(AppContext);
  const navigate = useNavigate();
  const galleryRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [referenceJson, setReferenceJson] = useState(null);
  const [referenceName, setReferenceName] = useState(null);

  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [zoom, setZoom] = useState(1);

  const [imgSize, setImgSize] = useState({ w: 1, h: 1 });

  const [polygons, setPolygons] = useState([]);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const [hintsOpen, setHintsOpen] = useState(false);


 

  const galleryItems = [
    {
      src: "rentgen/scoliosis_front.jpg",
      ref: "rentgen/scoliosis_front.json",
      title: t.g_title1,
      proj: t.g_proj_front,
      desc: t.g_desc_scoliosis,
    },
    {
      src: "rentgen/spondiolistes_sagit.jpg",
      ref: "rentgen/spondiolistes_sagit.json",
      title: t.g_title_lumbar,
      proj: t.g_proj_sagit,
      desc: t.g_desc_spond,
    },
    {
      src: "rentgen/scoliosis_sagit.png",
      ref: "rentgen/scoliosis_sagit.json",
      title: t.g_title_thoracic,
      proj: t.g_proj_sagit,
      desc: t.g_desc_norm,
    },
    {
      src: "rentgen/norma_sagit.png",
      ref: "rentgen/norma_sagit.json",
      title: t.g_title_cervical,
      proj: t.g_proj_sagit,
      desc: t.g_desc_norm,
    },
    {
      src: "rentgen/0029038-2.png",
      ref: "rentgen/0029038-2.json",
      title: t.g_title_cervical,
      proj: t.g_proj_sagit,
      desc: t.g_desc_norm,
    },
    {
      src: "rentgen/NORMAL-1110860-0001.jpg",
      ref: "rentgen/NORMAL-1110860-0001.json",
      title: t.g_title_thoracic,
      proj: t.g_proj_front,
      desc: t.g_desc_norm,
    },
    {
      src: "rentgen/5.jpg",
      ref: "rentgen/5.json",
      title: t.g_title1,
      proj: t.g_proj_sagit,
      desc: t.g_desc_scoliosis,
    },
  ];
  



const hintsMap = {
  "rentgen/scoliosis_front.jpg": t.hints.scoliosis_front,
  "rentgen/spondiolistes_sagit.jpg": t.hints.spondylolisthesis,
  "rentgen/scoliosis_sagit.png": t.hints.scoliosis_sagit,
  "rentgen/norma_sagit.png": t.hints.cervical_norma,
  "rentgen/0029038-2.png": t.hints.cervical_norma2,
  "rentgen/NORMAL-1110860-0001.jpg": t.hints.thoracic_norma,
  "rentgen/5.jpg": t.hints.scoliosis_sagit2
};

  
  function autoSaveJson(userJson, selectedImage) {
    const baseName = selectedImage.split("/").pop().split(".")[0];
    const fileName = `${baseName}.json`;
    const jsonStr = JSON.stringify(userJson, null, 2);
  
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
  
    a.href = url;
    a.download = fileName;
  
    a.click();
    URL.revokeObjectURL(url);
  }
  

  const handleSelect = async (item) => {
    setSelectedImage(item.src);
    setBrightness(0);
    setContrast(0);
    setZoom(1);
    setPolygons([]);
    setCurrentPolygon([]);
    setIsDrawing(false);

    setReferenceName(item.ref);

    const res = await fetch(item.ref);
    const data = await res.json();
    setReferenceJson(data);


    setHintsOpen(false);

  };

  const onImageLoad = (e) => {
    setImgSize({
      w: e.target.naturalWidth,
      h: e.target.naturalHeight,
    });
  };

  const handleSvgClick = (e) => {
    if (!isDrawing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (x < 0 || y < 0 || x > imgSize.w || y > imgSize.h) return;

    if (currentPolygon.length > 2) {
      const [fx, fy] = currentPolygon[0];
      const dist = Math.hypot(x - fx, y - fy);

      if (dist < 10) {
        const newPoly = {
          id: polygons.length + 1,
          points: currentPolygon,
        };
        setPolygons([...polygons, newPoly]);
        setCurrentPolygon([]);
        setIsDrawing(false);
        return;
      }
    }

    setCurrentPolygon([...currentPolygon, [x, y]]);
  };

  const handleSubmit = () => {
    const userJson = {
      version: "user",
      shapes: polygons.map((p) => ({
        label: String(p.id),
        points: p.points,
        shape_type: "polygon",
      })),
      imagePath: selectedImage,
    };


    navigate("/result", {
      state: {
        reference: referenceJson,
        referenceName,
        userJson,
        image: selectedImage,
        imgSize,
      },
    });
  };

  return (
    <section className="trainer-page">
      <div className="trainer-intro">
        <p>{t.gallery}</p>
      </div>

      <div className="gallery-container">
        <button className="arrow left" onClick={() => galleryRef.current.scrollBy({ left: -400, behavior: "smooth" })}>‹</button>

        <div className="gallery" ref={galleryRef}>
          {galleryItems.map((item, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-image-frame">
                <img src={item.src} className="gallery-img" />
              </div>

              <div className="gallery-info">
                <h3>{item.title}</h3>
                <h4>{item.proj}</h4>
                <p>{item.desc}</p>
              </div>

              <button className="select-btn" onClick={() => handleSelect(item)}>
                {t.choose}
              </button>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => galleryRef.current.scrollBy({ left: 400, behavior: "smooth" })}>›</button>
      </div>

      <div className="workspace">
        <div className="image-area">
          {selectedImage ? (
            <div className="canvas-wrapper" style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
              <img
                src={selectedImage}
                className="work-image"
                onLoad={onImageLoad}
                style={{
                  filter: `
                    brightness(${1 + brightness / 100})
                    contrast(${1 + contrast / 100})
                  `,
                }}
              />

              <svg className="overlay" width={imgSize.w} height={imgSize.h} onClick={handleSvgClick}>
                {currentPolygon.map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={1.3} fill="yellow" />
                ))}

                {currentPolygon.length > 1 && (
                  <polyline
                    points={currentPolygon.map((p) => p.join(",")).join(" ")}
                    fill="none"
                    stroke="yellow"
                    strokeWidth="1"
                  />
                )}

                {polygons.map((poly) => (
                  <polygon
                    key={poly.id}
                    points={poly.points.map((p) => p.join(",")).join(" ")}
                    fill="rgba(0,150,255,0.2)"
                    stroke="#0096ff"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
          ) : (
            <div className="image-placeholder">&lt;image&gt;</div>
          )}
        </div>

        <div className="settings-panel">
          <h3>{t.settings}</h3>

          <div className="setting-item">
            <label>{t.brightness}{brightness}</label>
            <input type="range" min="-100" max="100" value={brightness} onChange={(e) => setBrightness(+e.target.value)} />
          </div>

          <div className="setting-item">
            <label>{t.contrast}{contrast}</label>
            <input type="range" min="-100" max="100" value={contrast} onChange={(e) => setContrast(+e.target.value)} />
          </div>

          <div className="setting-item">
            <label>{t.zoom}{zoom.toFixed(2)}</label>
            <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(+e.target.value)} />
          </div>

          <button onClick={() => { setCurrentPolygon([]); setIsDrawing(true); }}>
            {t.createpol}
          </button>

          <h4>{t.polygons}</h4>
          <div className="polygon-list">
            {polygons.map((p) => (
              <div key={p.id}>{t.polygon} {p.id}.json</div>
            ))}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>{t.check}</button>
          <button 
  className="save-json-btn"
  onClick={() => autoSaveJson(userJson, selectedImage)}
>
  {t.safer}
  <span className="hint">{t.download}</span>
</button>

        </div>
      </div>
      {selectedImage && (
  <div className="hints-container">
    <button
      className="hints-toggle"
      onClick={() => setHintsOpen(!hintsOpen)}
    >
      {hintsOpen ? t.hide : t.opener}

    </button>

    {hintsOpen && (
      <div className="hints-box">
        <h3>{t.help}</h3>
        <ul>
          {hintsMap[selectedImage]?.map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}
    </section>
    
  );
}

export default Trainer;
