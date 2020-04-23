import React, { useState } from "react";
import Modal from "styled-react-modal";

import LocationDetails from "./LocationDetails";

const StyledModal = Modal.styled`
width: 30rem;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
opacity: ${props => props.opacity};
transition: opacity ease 1000ms;
border-radius: 30px;
padding: 1rem;

@media (max-width: 600px) {
  width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 500px) {
  width: 25rem;
}
@media (max-width: 400px) {
  width: 22rem;
}
`;

const Card = props => {
  const { location, saved, visit, toggleModal } = props;
  const { name, address } = location || visit.location;
  return (
    <div className="location-listing" onClick={toggleModal}>
      <section>
        <b>{name}</b>
        <br />
        <span>{address}</span>
        <br />
      </section>
      <p>
        {!!saved ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="fas fa-long-arrow-alt-right"></i>
        )}
      </p>
    </div>
  );
};

const LocationCard = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 20);
  }

  function beforeClose() {
    return new Promise(resolve => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  return (
    <div>
      <Card {...props} toggleModal={toggleModal} />
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <LocationDetails {...props} />
      </StyledModal>
    </div>
  );
};

export default LocationCard;
