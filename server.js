const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

const projectRouter = require("./data/routers/projectRouter.js");
const actionRouter = require("./data/routers/actionRouter.js");

const app = express();
app.use(bodyParser.json());
app.use("/projects", projectRouter);
app.use("/actions", actionRouter);

app.get("/", function(req, res) {
  res.json({ server: "running" });
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
