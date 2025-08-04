import React, { useState } from "react";
import "./Cards.css";

const cardsData = [
  {
    id: "pesas",
    title: "Pesas",
    image: "/images/BkCardFuerza.png",
    horarios: ["Lunes a sábados", "08:30 a 22:00 hs."],
  },
  {
    id: "fitness",
    title: "Fitness",
    image: "/images/BkCardFitness.png",
    horarios: ["Lunes y Jueves", "10:00 y 18:00 hs."],
  },
  {
    id: "spinning",
    title: "Spinning",
    image: "/images/BkCardSpining.png",
    horarios: ["Martes y viernes", "10:00 y 18:00 hs."],
  },
  {
    id: "zumba",
    title: "Zumba",
    image: "/images/BkCardZumba.png",
    horarios: ["Miércoles", "20:00 hs."],
  },
];

function CardHome() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEntrar = (id) => {
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.classList.add("clicked");
      setTimeout(() => {
        cardElement.classList.remove("clicked");
        alert(`Entrar a la actividad: ${id}`);
      }, 200);
    }
  };

  return (
    <div className="cards-container">
      <h2 className="title-heading">
        ¿Te ayudamos decidir tu entremamiento del día?
      </h2>
      <div className="cards-grid">
        {cardsData.map(({ id, title, image, horarios }) => {
          const flipped = flippedCards[id] || false;
          return (
            <div
              key={id}
              id={`card-${id}`}
              className={`card-wrapper ${flipped ? "flipped" : ""}`}
              onClick={() => toggleFlip(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleFlip(id);
              }}
            >
              {/* Frente */}
              <div
                className="custom-card-home card-front"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="card-title">{title}</div>

                <button
                  className="enter-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEntrar(id);
                  }}
                  aria-label={`Entrar a ${title}`}
                  type="button"
                >
                  Entrar
                </button>

                <button
                  className="horarios-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(id);
                  }}
                  aria-label={`Ver horarios de ${title}`}
                  type="button"
                >
                  Horarios
                </button>
              </div>

              {/* Reverso */}
              <div className="custom-card-home card-back">
                <div>
                  <div className="card-title-back">{title}</div>
                  <div className="card-info">
                    {horarios.map((linea, i) => (
                      <p key={i} className="horarios-info">
                        {linea}
                      </p>
                    ))}
                  </div>
                </div>

                <button
                  className="volver-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(id);
                  }}
                  aria-label={`Volver al frente de ${title}`}
                  type="button"
                >
                  &lt;&lt; Volver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardHome;
