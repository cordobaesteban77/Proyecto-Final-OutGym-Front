import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarouselHome.css";

function CarouselHome() {
  // Array con la información de cada slide
  const slides = [
    {
      image: "/images/pesasCarousel.jpg",
      alt: "Primer slide",
      title: "Pesas y aparatos",
      description: "Entrenamiento de fuerza y acondicionamiento físico",
    },
    {
      image: "/images/spiningCarousel.jpg",
      alt: "Segundo Slide",
      title: "Bicicletas fijas",
      description:
        "Ejercicios cardiovasculares y de resistencia en un entorno controlado",
    },
    {
      image: "/images/zumbaCarousel.jpg",
      alt: "Tercer Slide",
      title: "Fitness y baile",
      description: "Combina baile con ejercicios aeróbicos",
    },
  ];

  return (
    <Carousel controls={false} indicators={false} pause={false}>
      {slides.map((slide, index) => (
        <Carousel.Item key={index} interval={4000}>
          {" "}
          {/* 3 segundos por slide */}
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.alt}
            style={{
              height: "500px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselHome;
