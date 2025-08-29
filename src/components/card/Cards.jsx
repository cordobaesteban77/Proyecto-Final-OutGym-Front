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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFitnessOpen, setModalFitnessOpen] = useState(false);
  const [modalSpinningOpen, setModalSpinningOpen] = useState(false);
  const [modalZumbaOpen, setModalZumbaOpen] = useState(false);

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
        if (id === "pesas") {
          setModalOpen(true);
        } else if (id === "fitness") {
          setModalFitnessOpen(true);
        } else if (id === "spinning") {
          setModalSpinningOpen(true);
        } else if (id === "zumba") {
          setModalZumbaOpen(true);
        }
      }, 200);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeFitnessModal = () => {
    setModalFitnessOpen(false);
  };

  const closeSpinningModal = () => {
    setModalSpinningOpen(false);
  };

  const closeZumbaModal = () => {
    setModalZumbaOpen(false);
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
                  + info
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

      {/* Modal para Pesas */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">MUSCULACION</h2>

            {/* Icono de pesas agregado aquí */}
            <div className="modal-icon-container">
              <img
                src="/images/icono_pesas.png"
                alt="Icono de pesas"
                className="modal-icon"
              />
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Entrenamiento de fuerza o resistencia, usando máquinas de pesas
                y pesas libres (mancuernas, barras) para oponerse a la fuerza de
                la gravedad. El objetivo es desarrollar la masa muscular,
                aumentar la potencia y resistencia, y mejorar la salud general,
                lo que se logra levantando un peso que permita fatigar los
                músculos en una serie de repeticiones, ajustando la carga
                conforme se gana fuerza.
              </p>

              <h3 className="modal-subtitle">¿Qué es y cómo se hace?</h3>

              <div className="modal-list">
                <div className="modal-list-item">
                  <span className="modal-list-number">1.</span>
                  <div className="modal-list-content">
                    <strong>Equipo:</strong>
                    <span>
                      Se utilizan diferentes tipos de equipo, como máquinas con
                      discos, mancuernas, barras y pesas rusas.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">2.</span>
                  <div className="modal-list-content">
                    <strong>Movimiento:</strong>
                    <span>
                      Se realiza un movimiento controlado y lento al levantar y
                      bajar el peso, manteniendo una buena técnica y postura
                      para evitar lesiones.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">3.</span>
                  <div className="modal-list-content">
                    <strong>Repeticiones y Series:</strong>
                    <span>
                      Se debe levantar un peso adecuado que permita realizar
                      entre 12 y 15 repeticiones, y se pueden hacer varias
                      series por ejercicio.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">4.</span>
                  <div className="modal-list-content">
                    <strong>Progresión:</strong>
                    <span>
                      Conforme se gana fuerza, es importante aumentar
                      gradualmente la cantidad de peso para continuar desafiando
                      los músculos.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">5.</span>
                  <div className="modal-list-content">
                    <strong>Supervisión:</strong>
                    <span>
                      Es recomendable que este entrenamiento sea supervisado por
                      profesionales, especialmente al inicio, ya que es un
                      ejercicio de alta intensidad.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="modal-subtitle">Beneficios de hacer pesas:</h3>

              <div className="modal-benefits">
                <div className="modal-benefit-category">
                  <h4>Salud:</h4>
                  <p>
                    Mejora la salud del corazón, reduce la presión arterial y el
                    colesterol, fortalece huesos y articulaciones.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Fuerza y Músculo:</h4>
                  <p>
                    Incrementa la masa muscular, la fuerza y la resistencia, lo
                    que ayuda a prevenir la sarcopenia (pérdida muscular).
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Bienestar:</h4>
                  <p>
                    Contribuye à la longevidad, mejora el estado de ánimo,
                    reduces la ansiedad y la depresión, y mejora la calidad del
                    sueño.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Prevención de Lesiones:</h4>
                  <p>
                    Ayuda a prevenir lesiones y mejora el equilibrio y la
                    flexibilidad.
                  </p>
                </div>
              </div>
            </div>

            <button className="modal-back-btn" onClick={closeModal}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Modal para Fitness */}
      {modalFitnessOpen && (
        <div className="modal-overlay" onClick={closeFitnessModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeFitnessModal}>
              ×
            </button>
            <h2 className="modal-title">EJERCICIOS AEROBICOS y ANAEROBICOS</h2>

            {/* Icono de fitness agregado aquí */}
            <div className="modal-icon-container">
              <img
                src="/images/icono_fitness.png"
                alt="Icono de fitness"
                className="modal-icon"
              />
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Hacer fitness significa llevar un estilo de vida activo y
                saludable mediante la práctica regular de ejercicio físico y una
                alimentación equilibrada, con el objetivo de mejorar la
                condición física general (fuerza, resistencia, flexibilidad) y
                la salud integral, tanto física como mental. Incluye ejercicios
                aeróbicos y anaeróbicos, buscando un equilibrio en las
                capacidades corporales para una vida plena y con bienestar.
              </p>

              <h3 className="modal-subtitle">¿Qué implica hacer fitness?</h3>

              <div className="modal-list">
                <div className="modal-list-item">
                  <span className="modal-list-number">1.</span>
                  <div className="modal-list-content">
                    <strong>Actividad física regular:</strong>
                    <span>
                      Consiste en realizar ejercicios de forma planificada,
                      estructurada y repetitiva para mejorar o mantener la
                      aptitud física.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">2.</span>
                  <div className="modal-list-content">
                    <strong>Bienestar integral:</strong>
                    <span>
                      No se limita a la estética, sino que busca un estado de
                      salud óptimo que incluye la fortaleza del corazón, la
                      energía corporal y la reducción del estrés.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">3.</span>
                  <div className="modal-list-content">
                    <strong>Combinación de ejercicios:</strong>
                    <span>
                      Engloba tanto actividades aeróbicas (como correr) como
                      anaeróbicas (como el entrenamiento con pesas), que
                      potencian las capacidades físicas del cuerpo.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">4.</span>
                  <div className="modal-list-content">
                    <strong>Desarrollo de capacidades:</strong>
                    <span>
                      Se enfoca en aumentar la fuerza muscular, la velocidad, la
                      resistencia y la flexibilidad de las articulaciones.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">5.</span>
                  <div className="modal-list-content">
                    <strong>Alimentación equilibrada:</strong>
                    <span>
                      Es un pilar fundamental para alcanzar el estado de
                      fitness, ya que complementa el esfuerzo físico.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="modal-subtitle">Beneficios del fitness:</h3>

              <div className="modal-benefits">
                <div className="modal-benefit-category">
                  <h4>Salud física:</h4>
                  <p>
                    Ayuda a prevenir y controlar enfermedades no transmisibles,
                    fortalece los músculos y huesos, y mejora el funcionamiento
                    cardiovascular.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Salud mental y emocional:</h4>
                  <p>
                    Reduce los síntomas de depresión y ansiedad, fomenta una
                    actitud positiva y contribuye a una mejor salud cerebral.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Mejora de la calidad de vida:</h4>
                  <p>
                    Un cuerpo y mente sanos permiten disfrutar de una vida más
                    plena, con mayor energía y agilidad.
                  </p>
                </div>
              </div>
            </div>

            <button className="modal-back-btn" onClick={closeFitnessModal}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Modal para Spinning */}
      {/* Modal para Spinning */}
      {modalSpinningOpen && (
        <div className="modal-overlay" onClick={closeSpinningModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeSpinningModal}>
              ×
            </button>
            <h2 className="modal-title">BICICLETA FIJA</h2>

            {/* Icono de spinning agregado aquí */}
            <div className="modal-icon-container">
              <img
                src="/images/icono_spinning.png"
                alt="Icono de spinning"
                className="modal-icon"
              />
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Hacer spinning consiste en practicar ejercicio aeróbico y
                cardiovascular sobre una bicicleta estática specialized,
                conocida como ciclo indoor, al ritmo de la música y siguiendo
                las indicaciones de un instructor. Su objetivo principal es
                mejorar la resistencia y la fuerza, tonificar la musculatura del
                tren inferior (piernas y glúteos) y el abdomen, y facilitar la
                pérdida de peso, siendo una actividad de bajo impacto articular.
              </p>

              <h3 className="modal-subtitle">¿Cómo se practica?</h3>

              <div className="modal-list">
                <div className="modal-list-item">
                  <span className="modal-list-number">1.</span>
                  <div className="modal-list-content">
                    <strong>Bicicleta estática especializada:</strong>
                    <span>
                      Se utiliza una bicicleta con un volante de inercia que
                      proporciona resistencia y realismo al pedaleo, permitiendo
                      simular diferentes tipos de terreno y esfuerzo.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">2.</span>
                  <div className="modal-list-content">
                    <strong>Sesión guiada:</strong>
                    <span>
                      Las clases suelen ser grupales y se llevan a cabo en un
                      gimnasio o centro deportivo bajo la dirección de un
                      monitor.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">3.</span>
                  <div className="modal-list-content">
                    <strong>Música y ritmo:</strong>
                    <span>
                      La música enérgica es un componente clave para mantener la
                      motivación y guiar el ritmo de los ejercicios.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">4.</span>
                  <div className="modal-list-content">
                    <strong>Variedad de ejercicios:</strong>
                    <span>
                      Se combinan ejercicios de diferentes intensidades,
                      velocidades y resistencias, incluyendo trabajo de fuerza,
                      fondo, intervalos y velocidad, para trabajar diversos
                      grupos musculares y mejorar la condición física.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="modal-subtitle">Beneficios principales</h3>

              <div className="modal-benefits">
                <div className="modal-benefit-category">
                  <h4>Salud cardiovascular:</h4>
                  <p>Fortalece el corazón y mejora la circulación sanguínea.</p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Quema de calorías:</h4>
                  <p>Ayuda a perder peso y a mantener una figura armoniosa.</p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Tonificación muscular:</h4>
                  <p>
                    Fortalece principalmente las piernas, glúteos y abdomen.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Aumento de la resistencia y fuerza:</h4>
                  <p>
                    Mejora la capacidad pulmonar y la resistencia física en
                    general.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Bajo impacto articular:</h4>
                  <p>
                    Es ideal para personas con sobrepeso o problemas en las
                    articulaciones.
                  </p>
                </div>
              </div>
            </div>

            <button className="modal-back-btn" onClick={closeSpinningModal}>
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Modal para Zumba */}
      {modalZumbaOpen && (
        <div className="modal-overlay" onClick={closeZumbaModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeZumbaModal}>
              ×
            </button>
            <h2 className="modal-title">BAILE LATINO y AEROBICOS</h2>

            {/* Icono de zumba agregado aquí */}
            <div className="modal-icon-container">
              <img
                src="/images/icono_zumba.png"
                alt="Icono de zumba"
                className="modal-icon"
              />
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Hacer Zumba consiste en participar en una clase dirigida por un
                instructor, donde se combinan pasos de baile latino y aeróbicos
                para crear una rutina de ejercicio divertida y efectiva. Las
                clases utilizan ritmos de salsa, merengue, reguetón y cumbia,
                entre otros, alternando movimientos rápidos y lentos para
                tonificar el cuerpo, quemar calorías y mejorar la coordinación y
                resistencia. Es una disciplina apta para todas las edades y
                niveles de condición física, ya que se adapta a cada
                participante, ofreciendo también diversas modalidades como Zumba
                Toning (con pesas ligeras) o Aqua Zumba (en el agua).
              </p>

              <h3 className="modal-subtitle">¿Cómo es una clase de Zumba?</h3>

              <div className="modal-list">
                <div className="modal-list-item">
                  <span className="modal-list-number">1.</span>
                  <div className="modal-list-content">
                    <strong>Calentamiento:</strong>
                    <span>
                      La sesión comienza con movimientos suaves para preparar el
                      cuerpo.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">2.</span>
                  <div className="modal-list-content">
                    <strong>Coreografía:</strong>
                    <span>
                      Se realizan secuencias de pasos de baile al ritmo de
                      música latina y otros géneros.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">3.</span>
                  <div className="modal-list-content">
                    <strong>Ejercicios aeróbicos:</strong>
                    <span>
                      Los pasos combinan movimientos que estimulan el corazón y
                      los pulmones.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">4.</span>
                  <div className="modal-list-content">
                    <strong>Intensidad variable:</strong>
                    <span>
                      La rutina alterna momentos de alta y baja intensidad para
                      tonificar músculos y quemar grasa.
                    </span>
                  </div>
                </div>

                <div className="modal-list-item">
                  <span className="modal-list-number">5.</span>
                  <div className="modal-list-content">
                    <strong>Enfriamiento:</strong>
                    <span>
                      La clase finaliza con estiramientos para relajar la
                      musculatura.
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="modal-subtitle">Beneficios de hacer Zumba</h3>

              <div className="modal-benefits">
                <div className="modal-benefit-category">
                  <h4>Salud física:</h4>
                  <p>
                    Ayuda a quemar calorías, reducir la grasa corporal,
                    tonificar la musculatura y mejorar la resistencia
                    cardiopulmonar.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Bienestar mental:</h4>
                  <p>
                    Libera endorfinas, lo que reduce el estrés, aumenta la
                    autoestima y mejora el estado de ánimo.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Coordinación:</h4>
                  <p>
                    Fomenta el desarrollo de la coordinación entre pies y manos.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Diversión:</h4>
                  <p>
                    La música y el baile hacen la actividad entretenida,
                    motivando a mantener la rutina.
                  </p>
                </div>

                <div className="modal-benefit-category">
                  <h4>Socialización:</h4>
                  <p>
                    Las clases grupales crean un ambiente de comunidad y
                    permiten conocer gente nueva.
                  </p>
                </div>
              </div>
            </div>

            <button className="modal-back-btn" onClick={closeZumbaModal}>
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardHome;
