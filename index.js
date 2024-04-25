import http from "http";
import express from "express";

const port = 8000;

const app = express();

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

app.get("/hello", (req, res) => {
  res.send("Hallo!");
});
