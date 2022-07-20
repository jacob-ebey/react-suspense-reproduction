import * as React from "react";

export const TestContext = React.createContext<
  { value: Promise<unknown> | unknown } | undefined
>(undefined);

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>Count: {count}</p>
        <p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </p>
        <React.Suspense fallback={<SuspendedFallback />}>
          <SuspendedThing />
        </React.Suspense>

        <HydrationScript />
        <script async type="module" src="/script.js" />
      </body>
    </html>
  );
}

function HydrationScript() {
  let script = "window.__testContext = {};";
  script +=
    "window.__testContext.value = new Promise(resolve => setTimeout(() => resolve('value'), 3000));";

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

function SuspendedThing() {
  const ctx = React.useContext(TestContext);
  if (!ctx) throw new Error("Context not found");
  const value = ctx.value;
  if (value && typeof value === "object" && "then" in value) {
    throw (value as Promise<unknown>).then((resolved) => {
      ctx.value = resolved;
    });
  }

  return (
    <h2>
      <>Suspended Thing: {value}</>
    </h2>
  );
}

function SuspendedFallback() {
  return <h2>Suspended Fallback</h2>;
}
