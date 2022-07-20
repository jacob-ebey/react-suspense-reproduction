import { PassThrough } from "node:stream";
import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App, { TestContext } from "./app";

export default function handleDocumentRequest() {
  const { pipe } = renderToPipeableStream(
    <TestContext.Provider
      value={{
        value: new Promise((resolve) =>
          setTimeout(() => resolve("value"), 3000)
        ),
      }}
    >
      <App />
    </TestContext.Provider>
  );

  const body = new PassThrough();
  pipe(body);
  return body;
}
