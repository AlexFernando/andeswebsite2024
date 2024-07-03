import React, { useState, useEffect } from "react";
import {connect, styled, css, keyframes} from "frontity";
import Iframe from "@frontity/components/iframe";
import Loading from './Loading';

const Hero = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <HeroSection>
      {images.map((imageUrl, index) => (
        <HeroImage
          key={index}
          active={index === activeIndex}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
    </HeroSection>
  );
};

const HeroSection = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const fadeIn = keyframes`
  from {
    opacity: 0.1;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const zoomOut = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
`

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0;
  transform: scale(1);
  z-index: -2;
  animation-fill-mode: forwards;
  ${(props) =>
    props.active &&
    css`
      animation: ${fadeIn} .5s ease-in-out forwards,
        ${zoomIn} 5s ease-in-out forwards;
      opacity: 1;
      transform: scale(1.1);
      z-index: -1;
    `}
`;


export default  connect(Hero);


