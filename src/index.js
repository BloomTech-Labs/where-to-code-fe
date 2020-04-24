import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/Redux/store/"
import { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from 'styled-components';

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 1000ms;
`;

ReactDOM.render(
  <Provider store={store}>
    <ModalProvider backgroundComponent={FadingBackground}>
      <App />
    </ModalProvider>
  </Provider>,
  document.getElementById("root")
);
