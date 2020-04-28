import React, { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { connect } from "react-redux";
import { removeUserVisit, removeSavedLocation } from "../Redux/actions";

import { Link } from "react-router-dom";

const RemoveOption = props => {
  const { location, visit, saved, removeUserVisit, removeSavedLocation } = props;
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  async function initiateDelete() {
    await !!saved ? removeSavedLocation(location.id) : removeUserVisit(visit.id);
    toggleModal();
  }

  return (
    <>
      <Remove onClick={toggleModal}>
        Remove <i className="far fa-trash-alt"></i>
      </Remove>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <h2>Are you sure?</h2>
        <ConfirmContainer>
          <Yes onClick={initiateDelete}>Yes</Yes>
          <No onClick={toggleModal}>No</No>
        </ConfirmContainer>
      </StyledModal>
    </>
  );
};

const Remove = styled(Link)`
  text-decoration: none;
  color: red;
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  width: 25rem;
  align-items: center;
  background-color: white;
  opacity: ${props => props.opacity};
  transition: opacity ease 1000ms;
  border-radius: 15px;
  padding: 1rem;
`;

const ConfirmContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

const Yes = styled.span`
color: white
text-decoration: none;
padding: 0.5rem 2.5rem;
background-color: red;
border-radius: 5px;
font-weight: 500;

&&:hover {
  cursor: pointer
  background-color: crimson;
}
`;

const No = styled.span`
color: white
text-decoration: none;
padding: 0.5rem 2.5rem;
background-color: gray;
border-radius: 5px;
font-weight: 500;

&&:hover {
  cursor: pointer
  background-color: dark-gray;
}

`;

export default connect(null, { removeUserVisit, removeSavedLocation })(RemoveOption);
