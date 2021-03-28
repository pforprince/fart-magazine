const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
db();

app.use(express.json());

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use("/note", require("./routes/Note"));

app.listen(PORT, () => console.log("APP IS RUNNING..."));
