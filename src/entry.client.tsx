import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import App, { TestContext } from "./app";

hydrateRoot(
  document,
  <TestContext.Provider value={(window as any).__testContext}>
    <App />
  </TestContext.Provider>
);
