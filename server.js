import express from "express";

import handleDocumentRequest from "./dist/server.js";

const app = express();
app.use(express.static("public"));
app.all("*", (req, res) => {
  const body = handleDocumentRequest();
  body.pipe(res);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
