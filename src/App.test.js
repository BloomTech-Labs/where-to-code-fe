import React from "react";
import * as rtl from "@testing-library/react";
import App from "./App";
import { createStore } from 'redux';

// TEST REDUX STORE
const store = createStore(() => ({username: 'test1'}));

describe("RENDER APP.JS", () => {
  it("should render without crashing", () => {
    const app = rtl.render(<App store={store} />);
  })
});
